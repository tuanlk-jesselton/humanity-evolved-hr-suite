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
      // 1. Tìm user theo email
      const user = await this.userRepo.findOne({ 
        where: { email },
        select: ['id', 'email', 'password_hash', 'full_name', 'is_active']
      });

      // 2. Kiểm tra user tồn tại
      if (!user) {
        this.logger.warn(`Login failed: User with email ${email} not found`);
        throw new UnauthorizedException('Invalid email or password');
      }

      // 3. Kiểm tra trạng thái tài khoản
      if (!user.is_active) {
        this.logger.warn(`Login failed: User ${email} is inactive`);
        throw new UnauthorizedException('Account is inactive');
      }

      // 4. Kiểm tra mật khẩu
      if (!user.password_hash) {
        this.logger.warn(`Login failed: User ${email} does not have a password set`);
        throw new UnauthorizedException('Invalid email or password');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        this.logger.warn(`Login failed: Invalid password for user ${email}`);
        throw new UnauthorizedException('Invalid email or password');
      }

      // 5. Lấy danh sách roles của user
      const userRoles = await this.userRoleRepo.find({ 
        where: { user_id: user.id },
        relations: ['role']
      });

      const roles = userRoles.map(ur => ur.role.name);

      // 6. Tạo JWT token
      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
        roles: roles,
      };
      
      const token = this.jwtService.sign(payload);

      // 7. Trả về thông tin user và token
      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
        },
        roles,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Login error: ${errorMessage}`, errorStack);
      throw error; // Re-throw để xử lý ở controller
    }
  }
}
