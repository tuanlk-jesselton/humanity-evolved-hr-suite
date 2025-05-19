
import { IsNotEmpty, IsString, IsOptional, IsEnum, IsDate, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PayrollRunStatus } from '../../entities/payroll-run.entity';

export class CreatePayrollRunDto {
  @ApiProperty({ description: 'Payroll cycle ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  payroll_cycle_id!: number;

  @ApiProperty({ description: 'Payroll run name', example: 'January 2023 Payroll' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Period start date', example: '2023-01-01' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  period_start!: Date;

  @ApiProperty({ description: 'Period end date', example: '2023-01-31' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  period_end!: Date;

  @ApiProperty({ description: 'Payment date', example: '2023-02-05' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  payment_date!: Date;

  @ApiPropertyOptional({ 
    description: 'Status', 
    enum: PayrollRunStatus, 
    default: PayrollRunStatus.DRAFT 
  })
  @IsOptional()
  @IsEnum(PayrollRunStatus)
  status?: PayrollRunStatus;

  @ApiPropertyOptional({ description: 'Notes', example: 'Includes annual bonuses' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Created by user ID', example: 1 })
  @IsOptional()
  @IsNumber()
  created_by?: number;

  @ApiPropertyOptional({ description: 'Approved by user ID', example: 1 })
  @IsOptional()
  @IsNumber()
  approved_by?: number;

  @ApiPropertyOptional({ description: 'Is locked', default: false })
  @IsOptional()
  @IsBoolean()
  locked?: boolean;
}
