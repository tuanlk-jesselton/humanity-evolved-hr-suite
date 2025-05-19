
import { PartialType } from '@nestjs/swagger';
import { CreateLeaveRequestDto } from './create-leave-request.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLeaveRequestDto extends PartialType(CreateLeaveRequestDto) {
  @ApiPropertyOptional({ description: 'Days (automatically calculated if dates change)' })
  @IsOptional()
  @IsNumber()
  days?: number;
}
