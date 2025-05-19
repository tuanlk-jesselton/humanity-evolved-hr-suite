import { IsInt, IsDateString } from 'class-validator';

export class CreateAttendanceRecordDto {
  @IsInt()
  employeeId: number;

  @IsDateString()
  clockInTime: string;

  @IsDateString()
  clockOutTime: string;
}
