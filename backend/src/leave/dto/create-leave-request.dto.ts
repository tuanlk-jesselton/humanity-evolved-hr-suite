
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLeaveRequestDto {
  @ApiProperty({ description: 'Employee ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  employee_id!: number;

  @ApiProperty({ description: 'Leave type ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  leave_type_id!: number;

  @ApiProperty({ description: 'Start date', example: '2023-07-01' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  start_date!: Date;

  @ApiProperty({ description: 'End date', example: '2023-07-10' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  end_date!: Date;

  @ApiPropertyOptional({ description: 'Reason for leave', example: 'Family vacation' })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({ description: 'Attachment URL', example: 'https://example.com/document.pdf' })
  @IsOptional()
  @IsString()
  attachment?: string;
}
