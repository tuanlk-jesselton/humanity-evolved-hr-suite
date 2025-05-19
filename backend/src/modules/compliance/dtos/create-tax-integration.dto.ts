import { IsString } from 'class-validator';

export class CreateTaxIntegrationDto {
  @IsString()
  countryCode: string;

  @IsString()
  providerName: string;

  // For apiCredentialsJson, you may want to use IsObject or leave as any for flexibility
  apiCredentialsJson: any;
}
