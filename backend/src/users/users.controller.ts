
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  HttpException,
  Logger,
  Req,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common'; 
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService, CurrentUser } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserResponseDto } from './dto/user-response.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { 
  ApiTags, 
  ApiOperation, 
  ApiBearerAuth, 
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { getSchemaPath } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('Super Admin', 'Company Admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Get all users', 
    description: 'Retrieve a paginated list of users with optional filtering. Accessible by Super Admin and Company Admin only.' 
  })
  @ApiQuery({ 
    name: 'companyId', 
    required: false, 
    type: Number, 
    description: 'Filter users by company ID. If not provided, defaults to the current user\'s company for non-Super Admins.' 
  })
  @ApiQuery({ 
    name: 'page', 
    required: false, 
    type: Number, 
    description: 'Page number for pagination',
    example: 1
  })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    type: Number, 
    description: 'Number of items per page',
    example: 10
  })
  @ApiQuery({ 
    name: 'search', 
    required: false, 
    type: String, 
    description: 'Search term to filter users by email, name, or phone number' 
  })
  @ApiOkResponse({ 
    description: 'Successfully retrieved paginated list of users',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(UserResponseDto) }
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' }
          }
        }
      }
    }
  })
  @ApiForbiddenResponse({ description: 'User does not have permission to access this resource' })
  @ApiBadRequestResponse({ description: 'Invalid query parameters' })
  async findAll(
    @Query('companyId') companyId?: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Req() req?: Request
  ) {
    try {
      const currentUser = req?.user as CurrentUser | undefined;
      const result = await this.usersService.findAll(
        { companyId, page, limit, search },
        currentUser
      );
      
      return {
        ...result,
        data: result.data.map(user => 
          plainToClass(UserResponseDto, user, { excludeExtraneousValues: true })
        )
      };
    } catch (error) {
      this.logger.error(`Error fetching users: ${error.message}`, error.stack);
      
      if (
        error instanceof ForbiddenException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @Get(':id')
  @Roles('Super Admin', 'Company Admin', 'Manager')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Get user by ID', 
    description: 'Retrieve a single user by their ID. Accessible by Super Admin, Company Admin, and Manager.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'User ID', 
    type: Number,
    example: 1 
  })
  @ApiOkResponse({ 
    description: 'Successfully retrieved user', 
    type: UserResponseDto 
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'User does not have permission to access this resource' })
  async findOne(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    try {
      const currentUser = req.user as CurrentUser;
      const user = await this.usersService.findOne(+id, currentUser);
      return plainToClass(UserResponseDto, user, { excludeExtraneousValues: true });
    } catch (error) {
      this.logger.error(`Error fetching user: ${error.message}`, error.stack);
      
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  @Post()
  @Roles('Super Admin', 'Company Admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Create a new user', 
    description: 'Create a new user with the provided details. Accessible by Super Admin and Company Admin only.' 
  })
  @ApiBody({ 
    type: CreateUserDto,
    description: 'User details to create',
    examples: {
      admin: {
        summary: 'Create Admin User',
        value: {
          email: 'admin@example.com',
          password: 'securePassword123!',
          full_name: 'Admin User',
          role_ids: [1],
          company_id: 1
        }
      },
      regular: {
        summary: 'Create Regular User',
        value: {
          email: 'user@example.com',
          password: 'userPass123!',
          full_name: 'Regular User',
          role_ids: [2],
          company_id: 1
        }
      }
    }
  })
  @ApiCreatedResponse({ 
    description: 'User created successfully', 
    type: UserResponseDto 
  })
  @ApiBadRequestResponse({ 
    description: 'Invalid input data',
    schema: {
      example: {
        statusCode: 400,
        message: ['email must be an email', 'password is too weak'],
        error: 'Bad Request'
      }
    }
  })
  @ApiForbiddenResponse({ description: 'User does not have permission to create users' })
  @ApiConflictResponse({ description: 'Email already in use' })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request
  ) {
    try {
      const currentUser = req.user as CurrentUser;
      const newUser = await this.usersService.create(createUserDto, currentUser);
      return plainToClass(UserResponseDto, newUser, { excludeExtraneousValues: true });
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      
      if (
        error instanceof BadRequestException ||
        error instanceof ForbiddenException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Put(':id')
  @Roles('Super Admin', 'Company Admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Update a user', 
    description: 'Update an existing user with the provided details. Accessible by Super Admin and Company Admin only.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'User ID to update', 
    type: Number,
    example: 1 
  })
  @ApiBody({ 
    type: UpdateUserDto,
    description: 'User details to update',
    examples: {
      basic: {
        summary: 'Update Basic Info',
        value: {
          full_name: 'Updated Name',
          phone_number: '+1234567890',
          position: 'Senior Developer'
        }
      },
      password: {
        summary: 'Update Password',
        value: {
          current_password: 'oldPassword123!',
          password: 'newSecurePassword123!',
          password_confirmation: 'newSecurePassword123!'
        }
      }
    }
  })
  @ApiOkResponse({ 
    description: 'User updated successfully', 
    type: UserResponseDto 
  })
  @ApiBadRequestResponse({ 
    description: 'Invalid input data',
    schema: {
      example: {
        statusCode: 400,
        message: ['email must be an email', 'password is too weak'],
        error: 'Bad Request'
      }
    }
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'User does not have permission to update this user' })
  @ApiConflictResponse({ description: 'Email already in use' })
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request
  ) {
    try {
      const currentUser = req.user as CurrentUser;
      const updatedUser = await this.usersService.update(
        +id, 
        updateUserDto, 
        currentUser
      );
      return plainToClass(UserResponseDto, updatedUser, { excludeExtraneousValues: true });
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`, error.stack);
      
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException ||
        error instanceof ForbiddenException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  @Delete(':id')
  @Roles('Super Admin', 'Company Admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Delete a user', 
    description: 'Delete a user by their ID. Accessible by Super Admin and Company Admin only.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'User ID to delete', 
    type: Number,
    example: 1 
  })
  @ApiOkResponse({ 
    description: 'User deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'User deleted successfully'
      }
    }
  })
  @ApiBadRequestResponse({ 
    description: 'Cannot delete own account or last admin',
    schema: {
      example: {
        statusCode: 400,
        message: 'Cannot delete your own account',
        error: 'Bad Request'
      }
    }
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'User does not have permission to delete this user' })
  async remove(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    try {
      const currentUser = req.user as CurrentUser;
      await this.usersService.remove(+id, currentUser);
      
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully'
      };
    } catch (error) {
      this.logger.error(`Error deleting user: ${error.message}`, error.stack);
      
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
