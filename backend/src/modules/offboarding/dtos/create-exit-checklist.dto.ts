import { IsInt, IsString } from 'class-validator';

export class CreateExitChecklistDto {
  @IsInt()
  employeeId: number;

  @IsString()
  taskName: string;

  @IsString()
  status: string;
}
