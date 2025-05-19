import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateLeaveTypeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  accrualPolicy?: string;

  @IsOptional()
  @IsInt()
  maxDays?: number;
}
