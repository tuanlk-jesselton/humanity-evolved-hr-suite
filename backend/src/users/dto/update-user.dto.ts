
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { 
  IsEmail, 
  IsString, 
  IsOptional, 
  IsBoolean, 
  IsNumber, 
  MinLength, 
  IsEnum, 
  IsArray,
  IsStrongPassword,
  ValidateIf
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @ApiPropertyOptional({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  full_name?: string;

  @ApiPropertyOptional({
    description: 'Password (min 8 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character)',
    example: 'NewPassword123!',
  })
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }, { 
    message: 'Password is too weak. It must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character' 
  })
  password?: string;

  @ApiPropertyOptional({
    description: 'User roles',
    example: ['Employee', 'Manager'],
    enum: ['Super Admin', 'Company Admin', 'Manager', 'Employee'],
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(['Super Admin', 'Company Admin', 'Manager', 'Employee'], {
    each: true,
    message: 'Invalid role. Must be one of: Super Admin, Company Admin, Manager, Employee',
  })
  roles?: string[];

  @ApiPropertyOptional({
    description: 'Company ID (required for non-Super Admin roles)',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Company ID must be a number' })
  company_id?: number;

  @ApiPropertyOptional({
    description: 'Is user active',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'is_active must be a boolean value' })
  is_active?: boolean;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+1234567890',
  })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiPropertyOptional({
    description: 'User department ID',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Department ID must be a number' })
  department_id?: number;

  @ApiPropertyOptional({
    description: 'User position/title',
    example: 'Senior Developer',
  })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  avatar_url?: string;

  @ApiPropertyOptional({
    description: 'Current password (required when changing password)',
    example: 'CurrentPassword123!',
  })
  @ValidateIf(o => o.password)
  @IsString()
  current_password?: string;
}
