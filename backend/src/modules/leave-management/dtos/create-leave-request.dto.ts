import { IsInt, IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateLeaveRequestDto {
  @IsInt()
  employeeId: number;

  @IsInt()
  leaveTypeId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  status: string;

  @IsOptional()
  approvedBy?: number;
}
