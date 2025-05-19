
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, Role, UserRole } from '../auth/entities';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private userRolesRepository: Repository<UserRole>,
  ) {}

  async findAll(companyId?: number): Promise<any[]> {
    try {
      // Get all users based on companyId filter if provided
      const query = this.usersRepository.createQueryBuilder('user');
      
      if (companyId) {
        query.where('user.company_id = :companyId', { companyId });
      }
      
      const users = await query.getMany();
      
      // Get roles for each user
      const enhancedUsers = await Promise.all(
        users.map(async (user) => {
          const userRoles = await this.userRolesRepository.find({
            where: { user_id: user.id },
            relations: ['role'],
          });
          
          const roles = userRoles.map((ur) => ur.role.name);
          
          // Exclude sensitive information like password_hash
          const { password_hash, ...userData } = user;
          
          return {
            ...userData,
            roles,
          };
        }),
      );
      
      return enhancedUsers;
    } catch (error) {
      this.logger.error(`Error finding users: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      
      const userRoles = await this.userRolesRepository.find({
        where: { user_id: id },
        relations: ['role'],
      });
      
      const roles = userRoles.map((ur) => ur.role.name);
      
      // Exclude sensitive information
      const { password_hash, ...userData } = user;
      
      return {
        ...userData,
        roles,
      };
    } catch (error) {
      this.logger.error(`Error finding user: ${error.message}`);
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      // Check if email is already in use
      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
      
      if (existingUser) {
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
      }
      
      // Generate a random temporary password
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      
      // Create the user
      const newUser = this.usersRepository.create({
        email: createUserDto.email,
        password_hash: hashedPassword,
        full_name: createUserDto.full_name,
        is_active: createUserDto.is_active,
        company_id: createUserDto.company_id,
      });
      
      const savedUser = await this.usersRepository.save(newUser);
      
      // Find the role
      const role = await this.rolesRepository.findOne({
        where: { name: createUserDto.role },
      });
      
      if (!role) {
        throw new HttpException('Invalid role', HttpStatus.BAD_REQUEST);
      }
      
      // Assign the role to the user
      const userRole = this.userRolesRepository.create({
        user_id: savedUser.id,
        role_id: role.id,
      });
      
      await this.userRolesRepository.save(userRole);
      
      // TODO: Send email with temporary password
      
      // Return user data without sensitive information
      const { password_hash: _, ...userData } = savedUser;
      return {
        ...userData,
        roles: [createUserDto.role],
        tempPassword, // Only for development, remove in production
      };
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      
      // Update user properties
      if (updateUserDto.full_name) {
        user.full_name = updateUserDto.full_name;
      }
      
      if (updateUserDto.is_active !== undefined) {
        user.is_active = updateUserDto.is_active;
      }
      
      if (updateUserDto.company_id !== undefined) {
        user.company_id = updateUserDto.company_id;
      }
      
      // Save updated user
      const updatedUser = await this.usersRepository.save(user);
      
      // Update role if provided
      if (updateUserDto.role) {
        // Find the role
        const role = await this.rolesRepository.findOne({
          where: { name: updateUserDto.role },
        });
        
        if (!role) {
          throw new HttpException('Invalid role', HttpStatus.BAD_REQUEST);
        }
        
        // Remove existing roles
        await this.userRolesRepository.delete({ user_id: id });
        
        // Assign the new role
        const userRole = this.userRolesRepository.create({
          user_id: id,
          role_id: role.id,
        });
        
        await this.userRolesRepository.save(userRole);
      }
      
      // Return updated user without sensitive information
      const { password_hash: _, ...userData } = updatedUser;
      
      const userRoles = await this.userRolesRepository.find({
        where: { user_id: id },
        relations: ['role'],
      });
      
      const roles = userRoles.map((ur) => ur.role.name);
      
      return {
        ...userData,
        roles,
      };
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      
      // Delete user roles first
      await this.userRolesRepository.delete({ user_id: id });
      
      // Delete user
      await this.usersRepository.remove(user);
    } catch (error) {
      this.logger.error(`Error removing user: ${error.message}`);
      throw error;
    }
  }
}
