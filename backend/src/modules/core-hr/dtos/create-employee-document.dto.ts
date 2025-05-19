import { IsString, IsNumber } from 'class-validator';

export class CreateEmployeeDocumentDto {
  @IsNumber()
  employeeId: number;

  @IsString()
  documentType: string;

  @IsString()
  documentName: string;

  @IsString()
  filePath: string;
}
