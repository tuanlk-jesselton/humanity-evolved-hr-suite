
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsBoolean, IsNumber, MinLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsString()
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  full_name: string;

  @ApiProperty({
    description: 'User role',
    example: 'Employee',
    enum: ['Super Admin', 'Company Admin', 'Manager', 'Employee'],
  })
  @IsString()
  @IsEnum(['Super Admin', 'Company Admin', 'Manager', 'Employee'], {
    message: 'Invalid role. Must be one of: Super Admin, Company Admin, Manager, Employee',
  })
  role: string;

  @ApiPropertyOptional({
    description: 'Company ID (required for Company Admin, Manager, Employee)',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  company_id?: number;

  @ApiPropertyOptional({
    description: 'Is user active',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean = true;
}
