import { IsInt, IsString } from 'class-validator';

export class CreateTaskChecklistDto {
  @IsInt()
  employeeId: number;

  @IsString()
  taskName: string;

  @IsString()
  status: string;
}
