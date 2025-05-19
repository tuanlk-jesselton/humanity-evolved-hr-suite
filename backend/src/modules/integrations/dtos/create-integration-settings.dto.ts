import { IsString } from 'class-validator';

export class CreateIntegrationSettingsDto {
  @IsString()
  integrationName: string;

  // For settingsJson, you may want to use IsObject or leave as any for flexibility
  settingsJson: any;
}
