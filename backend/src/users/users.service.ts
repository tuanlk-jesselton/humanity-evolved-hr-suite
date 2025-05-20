import { 
  Injectable, 
  Logger, 
  HttpException, 
  HttpStatus, 
  NotFoundException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, Role, UserRole } from '../auth/entities';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserResponseDto, UserRoleResponseDto } from './dto/user-response.dto';

/**
 * Interface for pagination options
 */
interface PaginationOptions {
  companyId?: number;
  page?: number;
  limit?: number;
  search?: string;
}

/**
 * Interface for paginated results
 */
interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Interface for current user in requests
export interface CurrentUser {
  id: number;
  email: string;
  companyId?: number;
  roles: string[];
}

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



  /**
   * Find all users with pagination and filtering
   * @param options Pagination and filtering options
   * @param currentUser Current authenticated user for permission checks
   * @returns Paginated list of users with their roles
   */
  async findAll(
    options: PaginationOptions = {},
    currentUser?: CurrentUser
  ): Promise<PaginatedResult<UserResponseDto>> {
    try {
      const { companyId, page = 1, limit = 10, search } = options;
      const skip = (page - 1) * limit;
      
      // Only allow Super Admin to see all users across companies
      const isSuperAdmin = currentUser?.roles?.includes('Super Admin');
      let effectiveCompanyId = companyId;
      
      // If not super admin and no company ID, only show users from the same company
      if (!isSuperAdmin && !companyId && currentUser?.companyId) {
        effectiveCompanyId = currentUser.companyId;
      }

      const query = this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userRoles', 'userRole')
        .leftJoinAndSelect('userRole.role', 'role')
        .leftJoinAndSelect('user.company', 'company');
      
      // Apply company filter if specified
      if (effectiveCompanyId) {
        query.andWhere('user.company_id = :companyId', { companyId: effectiveCompanyId });
      }
      
      // Apply search filter if specified
      if (search) {
        query.andWhere(
          '(user.email LIKE :search OR user.fullName LIKE :search OR user.phoneNumber LIKE :search)',
          { search: `%${search}%` }
        );
      }
      
      // Only show active users by default
      query.andWhere('user.isActive = :isActive', { isActive: true });
      
      // Get total count for pagination
      const total = await query.getCount();
      
      // Apply pagination
      const users = await query
        .skip(skip)
        .take(limit)
        .orderBy('user.createdAt', 'DESC')
        .getMany();
      
      // Calculate pagination metadata
      const totalPages = Math.ceil(total / limit);
      
      return {
        data: users.map(user => this.mapToUserResponseDto(user)),
        meta: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages,
        },
      };
    } catch (error) {
      this.logger.error(`Error finding users: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  /**
   * Find a single user by ID
   * @param id User ID
   * @param currentUser Current authenticated user for permission checks
   * @returns User details with roles
   */
  async findOne(id: number, currentUser?: CurrentUser): Promise<UserResponseDto> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['userRoles', 'userRoles.role', 'company'],
      });
      
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Check permissions
      this.checkUserAccess(user, currentUser);
      
      return this.mapToUserResponseDto(user);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      this.logger.error(`Error finding user: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  /**
   * Create a new user
   * @param createUserDto User data
   * @param currentUser Current authenticated user for permission checks
   * @returns Created user details
   */
  async create(createUserDto: CreateUserDto, currentUser?: CurrentUser): Promise<UserResponseDto> {
    // Start a transaction
    const queryRunner = this.usersRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if email is already in use
      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
        withDeleted: true, // Include soft-deleted users
      });
      
      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }

      // Check permissions
      this.checkUserCreationPermission(createUserDto, currentUser);
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      
      // Create the user with camelCase properties to match the User entity
      const newUser = this.usersRepository.create({
        email: createUserDto.email,
        passwordHash: hashedPassword,
        fullName: createUserDto.full_name,
        phoneNumber: createUserDto.phone_number,
        position: createUserDto.position,
        companyId: createUserDto.company_id || currentUser?.companyId,
        departmentId: createUserDto.department_id,
        isActive: createUserDto.is_active !== undefined ? createUserDto.is_active : true,
      });
      
      const savedUser = await queryRunner.manager.save(User, newUser);
      
      // Assign roles if provided
      if (createUserDto.roles && createUserDto.roles.length > 0) {
        // Find all roles at once for better performance
        const roles = await this.rolesRepository.find({
          where: { name: In(createUserDto.roles) },
        });
        
        if (roles.length !== createUserDto.roles.length) {
          throw new BadRequestException('One or more roles are invalid');
        }
        
        // Assign all roles
        const userRoles = roles.map(role => 
          this.userRolesRepository.create({
            userId: savedUser.id,
            roleId: role.id,
          })
        );
        
        await queryRunner.manager.save(UserRole, userRoles);
      }
      
      await queryRunner.commitTransaction();
      
      // Reload the user with relations to ensure we have all the data
      const userWithRelations = await this.usersRepository.findOne({
        where: { id: savedUser.id },
        relations: ['userRoles', 'userRoles.role', 'company'],
      });
      
      if (!userWithRelations) {
        throw new InternalServerErrorException('Failed to retrieve created user');
      }
      
      return this.mapToUserResponseDto(userWithRelations);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to create user');
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser?: CurrentUser
  ): Promise<UserResponseDto> {
    // Start a transaction
    const queryRunner = this.usersRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find the user with relations
      const user = await queryRunner.manager.findOne(User, {
        where: { id },
        relations: ['userRoles', 'userRoles.role'],
      });
      
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      
      // Check permissions
      this.checkUserAccess(user, currentUser);
      
      // Check if email is being changed and if it's already in use
      if (updateUserDto.email && updateUserDto.email !== user.email) {
        const existingUser = await queryRunner.manager.findOne(User, {
          where: { email: updateUserDto.email },
          withDeleted: true,
        });
        
        if (existingUser) {
          throw new ConflictException('Email is already in use');
        }
      }
      
      // Update user properties
      if (updateUserDto.email) user.email = updateUserDto.email;
      if (updateUserDto.full_name) user.fullName = updateUserDto.full_name;
      if (updateUserDto.phone_number !== undefined) user.phoneNumber = updateUserDto.phone_number;
      if (updateUserDto.position !== undefined) user.position = updateUserDto.position;
      if (updateUserDto.avatar_url !== undefined) user.avatarUrl = updateUserDto.avatar_url;
      if (updateUserDto.department_id !== undefined) user.departmentId = updateUserDto.department_id;
      if (updateUserDto.is_active !== undefined) user.isActive = updateUserDto.is_active;
      
      // Handle password update if provided
      if (updateUserDto.password) {
        if (!updateUserDto.current_password) {
          throw new BadRequestException('Current password is required to change password');
        }
        
        // Verify current password if not an admin
        if (!currentUser?.roles?.includes('Super Admin') && !currentUser?.roles?.includes('Company Admin')) {
          if (!user.passwordHash) {
            throw new BadRequestException('Current password is not set');
          }
          
          const isPasswordValid = await bcrypt.compare(
            updateUserDto.current_password,
            user.passwordHash
          );
          
          if (!isPasswordValid) {
            throw new BadRequestException('Current password is incorrect');
          }
        }
        
        // Update to new password
        user.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
      }
      
      // Handle company ID update (only for Super Admin)
      if (updateUserDto.company_id !== undefined) {
        if (currentUser?.roles?.includes('Super Admin')) {
          user.companyId = updateUserDto.company_id;
        } else {
          throw new ForbiddenException('Only Super Admin can change company assignment');
        }
      }
      
      // Save user updates
      const updatedUser = await queryRunner.manager.save(User, user);
      
      // Update roles if provided
      if (updateUserDto.roles) {
        // Remove existing roles
        await queryRunner.manager.delete(UserRole, { userId: id });
        
        // Find all roles at once for better performance
        const roles = await this.rolesRepository.find({
          where: { name: In(updateUserDto.roles) },
        });
        
        if (roles.length !== updateUserDto.roles.length) {
          throw new BadRequestException('One or more roles are invalid');
        }
        
        // Assign all new roles
        const userRoles = roles.map(role => 
          this.userRolesRepository.create({
            userId: id,
            roleId: role.id,
          })
        );
        
        await queryRunner.manager.save(UserRole, userRoles);
      }
      
      await queryRunner.commitTransaction();
      
      // Reload the user with relations to ensure we have all the data
      const userWithRelations = await this.usersRepository.findOne({
        where: { id },
        relations: ['userRoles', 'userRoles.role', 'company'],
      });
      
      if (!userWithRelations) {
        throw new InternalServerErrorException('Failed to retrieve updated user');
      }
      
      return this.mapToUserResponseDto(userWithRelations);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException ||
        error instanceof BadRequestException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      
      this.logger.error(`Error updating user: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to update user');
    } finally {
      await queryRunner.release();
    }
  }

  private mapToUserResponseDto(user: User): UserResponseDto {
    const response = new UserResponseDto();
    response.id = user.id;
    response.email = user.email;
    response.full_name = user.fullName || '';
    response.phone_number = user.phoneNumber || undefined;
    response.position = user.position || undefined;
    response.avatar_url = user.avatarUrl || undefined;
    response.company_id = user.companyId || undefined;
    response.department_id = user.departmentId || undefined;
    response.is_active = user.isActive;
    response.created_at = user.createdAt;
    response.updated_at = user.updatedAt;
    response.last_login_at = user.lastLoginAt || undefined;
    
    // Map user roles to UserRoleResponseDto array
    response.roles = (user.userRoles || [])
      .filter(userRole => userRole.role) // Filter out any null roles
      .map(userRole => {
        const roleDto = new UserRoleResponseDto();
        roleDto.id = userRole.role!.id;
        roleDto.name = userRole.role!.name;
        roleDto.description = userRole.role!.description || '';
        return roleDto;
      });
    
    return response;
  }

  /**
   * Check if current user has permission to access/modify the target user
   */
  private checkUserAccess(targetUser: User, currentUser?: CurrentUser): void {
    if (!currentUser) {
      throw new ForbiddenException('Authentication required');
    }

    const isSuperAdmin = currentUser.roles.includes('Super Admin');
    const isCompanyAdmin = currentUser.roles.includes('Company Admin');
    
    // Super Admin can access any user
    if (isSuperAdmin) {
      return;
    }
    
    // Company Admin can only access users in their company
    if (isCompanyAdmin && targetUser.companyId === currentUser.companyId) {
      return;
    }
    
    // Users can access their own data
    if (targetUser.id === currentUser.id) {
      return;
    }
    
    throw new ForbiddenException('Insufficient permissions to access this user');
  }
  
  /**
   * Check if current user has permission to create a user with given attributes
   */
  private checkUserCreationPermission(createUserDto: CreateUserDto, currentUser?: CurrentUser): void {
    if (!currentUser) {
      throw new ForbiddenException('Authentication required');
    }

    const isSuperAdmin = currentUser.roles.includes('Super Admin');
    const isCompanyAdmin = currentUser.roles.includes('Company Admin');
    
    // Super Admin can create any user
    if (isSuperAdmin) {
      return;
    }
    
    // Company Admin can only create users in their company
    if (isCompanyAdmin) {
      // Check if creating for the same company
      if (createUserDto.company_id && createUserDto.company_id !== currentUser.companyId) {
        throw new ForbiddenException('Cannot create user for another company');
      }
      
      // Check roles - Company Admin can only create Managers and Employees
      const invalidRoles = createUserDto.roles?.filter(role => 
        ['Super Admin', 'Company Admin'].includes(role)
      );
      
      if (invalidRoles && invalidRoles.length > 0) {
        throw new ForbiddenException('Insufficient permissions to assign these roles');
      }
      
      return;
    }
    
    // Regular users cannot create other users
    throw new ForbiddenException('Insufficient permissions to create users');
  }
  
  async remove(id: number, currentUser?: CurrentUser): Promise<void> {
    const queryRunner = this.usersRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find the user with relations
      const user = await queryRunner.manager.findOne(User, {
        where: { id },
        relations: ['userRoles'],
      });
      
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      
      // Check permissions
      this.checkUserAccess(user, currentUser);
      
      // Check if user is trying to delete themselves
      if (currentUser && user.id === currentUser.id) {
        throw new BadRequestException('Cannot delete your own account');
      }
      
      // Delete user roles first
      await queryRunner.manager.delete(UserRole, { userId: id });
      
      // Delete user
      await queryRunner.manager.remove(User, user);
      
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      
      this.logger.error(`Error removing user: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to delete user');
    } finally {
      await queryRunner.release();
    }
  }
}
