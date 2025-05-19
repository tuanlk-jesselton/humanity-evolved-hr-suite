
import { 
  Injectable, 
  UnauthorizedException, 
  Logger, 
  Inject, 
  forwardRef,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User, Role, UserRole } from './entities';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User) 
    private readonly userRepo: Repository<User>,
    
    @InjectRepository(UserRole) 
    private readonly userRoleRepo: Repository<UserRole>,
    
    @InjectRepository(Role) 
    private readonly roleRepo: Repository<Role>,
    
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    try {
      // 1. Find user by email
      const user = await this.userRepo.findOne({ 
        where: { email },
        select: ['id', 'email', 'password_hash', 'full_name', 'is_active', 'company_id']
      });

      // 2. Check if user exists
      if (!user) {
        this.logger.warn(`Login failed: User with email ${email} not found`);
        throw new UnauthorizedException('Invalid email or password');
      }

      // 3. Check account status
      if (!user.is_active) {
        this.logger.warn(`Login failed: User ${email} is inactive`);
        throw new UnauthorizedException('Account is inactive');
      }

      // 4. Verify password
      if (!user.password_hash) {
        this.logger.warn(`Login failed: User ${email} does not have a password set`);
        throw new UnauthorizedException('Invalid email or password');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        this.logger.warn(`Login failed: Invalid password for user ${email}`);
        throw new UnauthorizedException('Invalid email or password');
      }

      // 5. Get user roles
      const userRoles = await this.userRoleRepo.find({ 
        where: { user_id: user.id },
        relations: ['role']
      });

      const roles = userRoles.map(ur => ur.role.name);

      // 6. Create JWT token
      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
        roles: roles,
      };
      
      const token = this.jwtService.sign(payload);

      // 7. Return user info and token
      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          company_id: user.company_id
        },
        roles,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Login error: ${errorMessage}`, errorStack);
      throw error; // Re-throw to be handled by controller
    }
  }
  
  async getUserRoles(userId: number): Promise<string[]> {
    try {
      const userRoles = await this.userRoleRepo.find({
        where: { user_id: userId },
        relations: ['role'],
      });
      
      return userRoles.map(ur => ur.role.name);
    } catch (error) {
      this.logger.error(`Error retrieving user roles: ${error.message}`);
      return [];
    }
  }
}
