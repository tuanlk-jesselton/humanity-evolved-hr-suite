
import { Injectable, Logger, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, Role, UserRole } from './entities';
import { LoginDto, RegisterDto } from './dto';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private readonly userRolesRepository: Repository<UserRole>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'passwordHash'>> {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.passwordHash || '',
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const { passwordHash, ...result } = user;
      return result as Omit<User, 'passwordHash'>;
    } catch (error) {
      this.logger.error(`Error validating user: ${error.message}`);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<{ token: string; user: { id: number; email: string; fullName: string | null }; roles: string[] }> {
    try {
      const user = await this.validateUser(email, password);
      
      // Get user roles
      const userRoles = await this.getUserRoles(user.id);
      
      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
        roles: userRoles,
      };

      return {
        token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
        roles: userRoles,
      };
    } catch (error) {
      this.logger.error(`Error during login: ${error.message}`);
      throw error;
    }
  }

  async register(registerDto: RegisterDto): Promise<Omit<User, 'passwordHash'> & { roles: string[] }> {
    const { email, password, full_name, company_id } = registerDto;
    
    try {
      // Check if email is already taken
      const existingUser = await this.usersRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
      
      // Hash the password
      const passwordHash = await bcrypt.hash(password, 10);
      
      // Create the user
      const newUser = this.usersRepository.create({
        email,
        passwordHash,
        fullName: full_name,
        companyId: company_id,
        isActive: true,
      } as User);
      
      const savedUser = await this.usersRepository.save(newUser);
      
      // Assign default 'Employee' role
      const employeeRole = await this.rolesRepository.findOne({ where: { name: 'Employee' } });
      
      if (!employeeRole) {
        this.logger.warn('Employee role not found. Creating new role.');
        const role = this.rolesRepository.create({
          name: 'Employee',
          description: 'Regular employee with basic access'
        });
        const savedRole = await this.rolesRepository.save(role);
        
        const userRole = this.userRolesRepository.create({
          userId: savedUser.id,
          roleId: savedRole.id,
        });
        await this.userRolesRepository.save(userRole);
      } else {
        const userRole = this.userRolesRepository.create({
          userId: savedUser.id as number,
          roleId: employeeRole.id,
        } as UserRole);
        await this.userRolesRepository.save(userRole);
      }
      
      // Return user without password
      const { passwordHash: _, ...result } = savedUser;
      return {
        ...result,
        roles: ['Employee'],
      };
    } catch (error) {
      this.logger.error(`Error during registration: ${error.message}`);
      throw error;
    }
  }

  async getUserRoles(userId: number): Promise<string[]> {
    try {
      const userRoles = await this.userRolesRepository.find({
        where: { userId },
        relations: ['role'],
      });

      return userRoles.map((userRole) => userRole.role.name);
    } catch (error) {
      this.logger.error(`Error getting user roles: ${error.message}`);
      throw error;
    }
  }

  async getUserFromToken(token: string): Promise<Omit<User, 'passwordHash'>> {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usersRepository.findOne({
        where: { id: decoded.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const { passwordHash, ...result } = user;
      return result as Omit<User, 'passwordHash'>;
    } catch (error) {
      this.logger.error(`Error getting user from token: ${error.message}`);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUserInfo(userId: number): Promise<Omit<User, 'passwordHash'> & { roles: string[] }> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const userRoles = await this.getUserRoles(userId);

      const { passwordHash, ...userInfo } = user;
      
      return {
        ...userInfo,
        roles: userRoles,
      } as Omit<User, 'passwordHash'> & { roles: string[] };
    } catch (error) {
      this.logger.error(`Error getting user info: ${error.message}`);
      throw error;
    }
  }
}
