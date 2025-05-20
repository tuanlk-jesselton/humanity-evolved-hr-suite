
import { IsString, IsNumber, IsEmail, IsDate, IsOptional, IsBoolean, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class EmploymentDetailsDto {
  @ApiProperty({ description: 'Employment start date' })
  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty({ description: 'Employment end date', required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  end_date?: Date;

  @ApiProperty({ description: 'Employment type (full-time, part-time, contract, etc.)' })
  @IsString()
  employment_type: string;

  @ApiProperty({ description: 'Is current employment', default: true })
  @IsBoolean()
  @IsOptional()
  is_current?: boolean;

  @ApiProperty({ description: 'Employment status (active, on leave, terminated, etc.)' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ description: 'Additional employment notes', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}

class SalaryDto {
  @ApiProperty({ description: 'Base salary amount' })
  @IsNumber()
  base_amount: number;

  @ApiProperty({ description: 'Currency code (USD, EUR, etc.)' })
  @IsString()
  currency: string;

  @ApiProperty({ description: 'Payment frequency (hourly, weekly, monthly, annually)' })
  @IsString()
  frequency: string;

  @ApiProperty({ description: 'Effective date of the salary' })
  @IsDate()
  @Type(() => Date)
  effective_date: Date;

  @ApiProperty({ description: 'Is current salary', default: true })
  @IsBoolean()
  @IsOptional()
  is_current?: boolean;

  @ApiProperty({ description: 'Additional allowances', required: false })
  @IsNumber()
  @IsOptional()
  allowances?: number;

  @ApiProperty({ description: 'Additional notes about salary', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateEmployeeDto {
  @ApiProperty({ description: 'User ID associated with this employee' })
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'Department ID', required: false })
  @IsNumber()
  @IsOptional()
  department_id?: number;

  @ApiProperty({ description: 'Manager ID (Employee ID of the manager)', required: false })
  @IsNumber()
  @IsOptional()
  manager_id?: number;

  @ApiProperty({ description: 'Employee ID/code in the company', required: false })
  @IsString()
  @IsOptional()
  employee_id?: string;

  @ApiProperty({ description: 'Job title', required: false })
  @IsString()
  @IsOptional()
  job_title?: string;

  @ApiProperty({ description: 'Date of birth', required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date_of_birth?: Date;

  @ApiProperty({ description: 'Gender', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ description: 'Marital status', required: false })
  @IsString()
  @IsOptional()
  marital_status?: string;

  @ApiProperty({ description: 'Phone number', required: false })
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiProperty({ description: 'Emergency contact name', required: false })
  @IsString()
  @IsOptional()
  emergency_contact_name?: string;

  @ApiProperty({ description: 'Emergency contact phone', required: false })
  @IsString()
  @IsOptional()
  emergency_contact_phone?: string;

  @ApiProperty({ description: 'Home address', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'City', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ description: 'State/Province', required: false })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ description: 'Postal code', required: false })
  @IsString()
  @IsOptional()
  postal_code?: string;

  @ApiProperty({ description: 'Country', required: false })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ description: 'Nationality', required: false })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiProperty({ description: 'Profile image URL', required: false })
  @IsString()
  @IsOptional()
  profile_image?: string;

  @ApiProperty({ description: 'Employment details', type: EmploymentDetailsDto, required: false })
  @IsObject()
  @ValidateNested()
  @Type(() => EmploymentDetailsDto)
  @IsOptional()
  employmentDetails?: EmploymentDetailsDto;

  @ApiProperty({ description: 'Salary information', type: SalaryDto, required: false })
  @IsObject()
  @ValidateNested()
  @Type(() => SalaryDto)
  @IsOptional()
  salary?: SalaryDto;
}
