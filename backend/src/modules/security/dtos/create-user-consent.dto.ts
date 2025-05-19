import { IsInt, IsString } from 'class-validator';

export class CreateUserConsentDto {
  @IsInt()
  employeeId: number;

  @IsString()
  consentType: string;

  @IsString()
  consentDate: string;
}
