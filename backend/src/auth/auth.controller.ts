import { 
  Controller, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
  BadRequestException,
  Logger
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiUnauthorizedResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ 
    summary: 'User login',
    description: 'Authenticate user and return JWT token',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({ 
    description: 'Invalid credentials',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid email or password',
        error: 'Unauthorized',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'email must be an email',
          'password must be longer than or equal to 6 characters',
        ],
        error: 'Bad Request',
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto.email, loginDto.password);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Login failed: ${errorMessage}`, errorStack);
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
