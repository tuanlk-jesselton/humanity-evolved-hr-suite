
import { IsNotEmpty, IsOptional, IsString, IsDate, IsNumber, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EmploymentType, EmploymentStatus } from '../../entities/employment-detail.entity';
import { SalaryType, PaymentFrequency } from '../../entities/salary.entity';

class EmploymentDetailDto {
  @ApiProperty({ description: 'Hire date', example: '2023-01-15' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  hire_date!: Date;

  @ApiPropertyOptional({ description: 'End date', example: '2025-01-15' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_date?: Date;

  @ApiPropertyOptional({ 
    description: 'Employment type', 
    enum: EmploymentType, 
    default: EmploymentType.FULL_TIME 
  })
  @IsOptional()
  @IsEnum(EmploymentType)
  employment_type?: EmploymentType;

  @ApiPropertyOptional({ 
    description: 'Employment status', 
    enum: EmploymentStatus, 
    default: EmploymentStatus.ACTIVE 
  })
  @IsOptional()
  @IsEnum(EmploymentStatus)
  status?: EmploymentStatus;

  @ApiPropertyOptional({ description: 'Contract file URL', example: 'https://example.com/contract.pdf' })
  @IsOptional()
  @IsString()
  contract_file?: string;

  @ApiPropertyOptional({ description: 'Notes', example: 'Probation period: 3 months' })
  @IsOptional()
  @IsString()
  notes?: string;
}

class SalaryDto {
  @ApiProperty({ description: 'Effective date', example: '2023-01-15' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  effective_date!: Date;

  @ApiPropertyOptional({ 
    description: 'Salary type', 
    enum: SalaryType, 
    default: SalaryType.MONTHLY 
  })
  @IsOptional()
  @IsEnum(SalaryType)
  salary_type?: SalaryType;

  @ApiProperty({ description: 'Salary amount', example: 5000 })
  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @ApiPropertyOptional({ 
    description: 'Payment frequency', 
    enum: PaymentFrequency, 
    default: PaymentFrequency.MONTHLY 
  })
  @IsOptional()
  @IsEnum(PaymentFrequency)
  payment_frequency?: PaymentFrequency;

  @ApiPropertyOptional({ description: 'Currency', example: 'USD', default: 'USD' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ description: 'Notes', example: 'Includes transportation allowance' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateEmployeeDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  user_id!: number;

  @ApiPropertyOptional({ description: 'Department ID', example: 1 })
  @IsOptional()
  @IsNumber()
  department_id?: number;

  @ApiPropertyOptional({ description: 'Manager ID', example: 1 })
  @IsOptional()
  @IsNumber()
  manager_id?: number;

  @ApiPropertyOptional({ description: 'Employee ID', example: 'EMP-001' })
  @IsOptional()
  @IsString()
  employee_id?: string;

  @ApiPropertyOptional({ description: 'Job title', example: 'Software Engineer' })
  @IsOptional()
  @IsString()
  job_title?: string;

  @ApiPropertyOptional({ description: 'Date of birth', example: '1990-01-01' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date_of_birth?: Date;

  @ApiPropertyOptional({ description: 'Gender', example: 'Male' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ description: 'Marital status', example: 'Single' })
  @IsOptional()
  @IsString()
  marital_status?: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+1 (555) 123-4567' })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiPropertyOptional({ description: 'Emergency contact name', example: 'John Doe' })
  @IsOptional()
  @IsString()
  emergency_contact_name?: string;

  @ApiPropertyOptional({ description: 'Emergency contact phone', example: '+1 (555) 987-6543' })
  @IsOptional()
  @IsString()
  emergency_contact_phone?: string;

  @ApiPropertyOptional({ description: 'Address', example: '123 Main St' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'City', example: 'San Francisco' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'State/Province', example: 'CA' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'Postal code', example: '94105' })
  @IsOptional()
  @IsString()
  postal_code?: string;

  @ApiPropertyOptional({ description: 'Country', example: 'USA' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'Nationality', example: 'American' })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiPropertyOptional({ description: 'Profile image URL', example: 'https://example.com/profile.jpg' })
  @IsOptional()
  @IsString()
  profile_image?: string;

  @ApiPropertyOptional({ description: 'Employment details' })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmploymentDetailDto)
  employmentDetails?: EmploymentDetailDto;

  @ApiPropertyOptional({ description: 'Salary information' })
  @IsOptional()
  @ValidateNested()
  @Type(() => SalaryDto)
  salary?: SalaryDto;
}
