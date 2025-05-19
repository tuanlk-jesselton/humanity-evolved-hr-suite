
import { IsOptional, IsArray, IsNumber, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GeneratePayslipsDto {
  @ApiPropertyOptional({ 
    description: 'Specific employee IDs to generate payslips for (empty for all employees)', 
    type: [Number],
    example: [1, 2, 3] 
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  employee_ids?: number[];

  @ApiPropertyOptional({ 
    description: 'Whether to regenerate payslips for employees that already have them', 
    default: false 
  })
  @IsOptional()
  @IsBoolean()
  regenerate?: boolean;
}
