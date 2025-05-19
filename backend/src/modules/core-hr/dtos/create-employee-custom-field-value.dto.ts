import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeCustomFieldValueDto {
  @IsNumber()
  employeeId: number;

  @IsNumber()
  customFieldId: number;

  @IsOptional()
  @IsString()
  value?: string;
}
