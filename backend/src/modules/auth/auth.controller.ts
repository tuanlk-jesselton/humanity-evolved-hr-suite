import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const employee = await this.authService.validateAdmin(
      loginDto.email,
      loginDto.password,
    );
    if (!employee) {
      throw new UnauthorizedException('Invalid credentials or not an admin');
    }
    // Don't return password
    const { password, ...result } = employee;
    return result;
  }
}
