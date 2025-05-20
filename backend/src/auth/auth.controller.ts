
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
  Logger,
  Get,
  UseGuards,
  Req
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto, RegisterDto } from './dto';
import { JwtAuthGuard } from './guards';

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

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ 
    summary: 'User registration',
    description: 'Register a new user',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ 
    status: 201, 
    description: 'User created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Validation error or email already exists',
  })
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Registration failed: ${errorMessage}`, errorStack);
      
      if (errorMessage.includes('already exists')) {
        throw new BadRequestException('Email already exists');
      }
      
      throw new BadRequestException('Registration failed');
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get current user info',
    description: 'Get information about the currently authenticated user',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User information retrieved successfully',
  })
  @ApiUnauthorizedResponse({ 
    description: 'Unauthorized - Valid JWT token required',
  })
  async getCurrentUser(@Req() req) {
    try {
      const userId = req.user.sub;
      const userInfo = await this.authService.getUserInfo(userId);
      return userInfo;
    } catch (error) {
      this.logger.error(`Error retrieving current user: ${error.message}`);
      throw error;
    }
  }
}
