import { IsInt, IsString } from 'class-validator';

export class CreateTaxFormDto {
  @IsInt()
  employeeId: number;

  @IsString()
  formType: string;

  @IsString()
  fileUrl: string;

  @IsInt()
  year: number;
}
