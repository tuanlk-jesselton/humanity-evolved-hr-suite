import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCustomFieldDto {
  id?: string;
  @IsString()
  name: string;

  @IsString()
  fieldType: string;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean = false;
}
