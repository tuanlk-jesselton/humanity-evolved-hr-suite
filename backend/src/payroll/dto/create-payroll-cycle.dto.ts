
import { IsNotEmpty, IsString, IsOptional, IsEnum, IsDate, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaymentFrequency } from '../../entities/salary.entity';

export class CreatePayrollCycleDto {
  @ApiProperty({ description: 'Company ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  company_id!: number;

  @ApiProperty({ description: 'Payroll cycle name', example: 'Monthly Payroll' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ 
    description: 'Payment frequency', 
    enum: PaymentFrequency, 
    default: PaymentFrequency.MONTHLY 
  })
  @IsOptional()
  @IsEnum(PaymentFrequency)
  frequency?: PaymentFrequency;

  @ApiPropertyOptional({ description: 'Description', example: 'Standard monthly payroll cycle' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Start date', example: '2023-01-01' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start_date?: Date;

  @ApiPropertyOptional({ description: 'Is active', default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
