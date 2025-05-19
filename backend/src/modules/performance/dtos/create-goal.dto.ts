import { IsInt, IsString, IsNumber } from 'class-validator';

export class CreateGoalDto {
  @IsInt()
  employeeId: number;

  @IsString()
  goalTitle: string;

  @IsString()
  goalDescription: string;

  @IsNumber()
  progressPercent: number;
}
