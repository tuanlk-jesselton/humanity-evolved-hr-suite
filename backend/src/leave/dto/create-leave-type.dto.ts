
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLeaveTypeDto {
  @ApiProperty({ description: 'Company ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  company_id!: number;

  @ApiProperty({ description: 'Leave type name', example: 'Annual Leave' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ description: 'Description', example: 'Yearly vacation leave' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Default days per year', example: 20 })
  @IsOptional()
  @IsNumber()
  default_days?: number;

  @ApiPropertyOptional({ description: 'Is paid leave', default: true })
  @IsOptional()
  @IsBoolean()
  paid?: boolean;

  @ApiPropertyOptional({ description: 'Is active', default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({ description: 'Color code', example: '#4CAF50' })
  @IsOptional()
  @IsString()
  color?: string;
}
