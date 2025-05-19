import { IsString, IsOptional } from 'class-validator';

export class CreateCountrySettingsDto {
  @IsString()
  countryCode: string;

  @IsString()
  currency: string;

  @IsOptional()
  @IsString()
  locale?: string;
}
