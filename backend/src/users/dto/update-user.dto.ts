
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, MinLength, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  full_name?: string;

  @ApiPropertyOptional({
    description: 'User role',
    example: 'Employee',
    enum: ['Super Admin', 'Company Admin', 'Manager', 'Employee'],
  })
  @IsOptional()
  @IsString()
  @IsEnum(['Super Admin', 'Company Admin', 'Manager', 'Employee'], {
    message: 'Invalid role. Must be one of: Super Admin, Company Admin, Manager, Employee',
  })
  role?: string;

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
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
