
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
  HttpException,
  Logger
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('Super Admin', 'Company Admin')
  async findAll(@Query('companyId') companyId?: number) {
    try {
      return await this.usersService.findAll(companyId);
    } catch (error) {
      this.logger.error(`Error fetching users: ${error.message}`);
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @Roles('Super Admin', 'Company Admin', 'Manager')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      this.logger.error(`Error fetching user: ${error.message}`);
      throw error;
    }
  }

  @Post()
  @Roles('Super Admin', 'Company Admin')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to create user', 
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(':id')
  @Roles('Super Admin', 'Company Admin')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to update user', 
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @Roles('Super Admin')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.remove(+id);
    } catch (error) {
      this.logger.error(`Error deleting user: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to delete user', 
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
