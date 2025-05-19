import { IsString, IsBoolean } from 'class-validator';

export class CreatePayItemTypeDto {
  @IsString()
  name: string;

  @IsBoolean()
  isAllowance: boolean;
}
