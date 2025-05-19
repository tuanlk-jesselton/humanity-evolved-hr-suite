import { IsString } from 'class-validator';

export class CreateLegalDocumentDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  countryCode: string;
}
