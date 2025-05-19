import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreatePayrollRunDto {
  @IsInt()
  month: number;

  @IsInt()
  year: number;

  @IsString()
  status: string;

  @IsOptional()
  createdBy?: number;
}
