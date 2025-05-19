import { IsInt, IsDateString } from 'class-validator';

export class CreateRosterDto {
  @IsInt()
  employeeId: number;

  @IsDateString()
  shiftStart: string;

  @IsDateString()
  shiftEnd: string;
}
