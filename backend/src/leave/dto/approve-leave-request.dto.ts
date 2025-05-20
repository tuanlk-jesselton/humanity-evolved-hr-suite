
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApproveLeaveRequestDto {
  @ApiProperty({ description: 'Approver ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  approver_id!: number;

  @ApiProperty({ description: 'Is approved', example: true })
  @IsNotEmpty()
  @IsBoolean()
  approved!: boolean;

  @ApiPropertyOptional({ description: 'Comments', example: 'Approved based on team capacity' })
  @IsOptional()
  @IsString()
  comments?: string;
}
