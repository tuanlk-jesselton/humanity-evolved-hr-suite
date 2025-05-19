/* eslint-disable prettier/prettier */
import {
  IsString,
  IsEmail, 
  IsOptional, 
  IsDate, 
  IsNumber,
  MinLength,
  IsEnum
} from 'class-validator';
import { Type } from 'class-transformer';


export class CreateEmployeeDto {
  @IsString()
  firstName: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['admin', 'manager', 'employee'])
  role: 'admin' | 'manager' | 'employee';

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  hireDate?: Date;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  employmentStatus?: string;

  @IsOptional()
  @IsNumber()
  departmentId?: number;
}
