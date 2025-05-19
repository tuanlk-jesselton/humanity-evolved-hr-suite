import { IsString } from 'class-validator';

export class CreateReportsDto {
  @IsString()
  reportType: string;

  // For dataJson, you may want to use IsObject or leave as any for flexibility
  dataJson: any;
}
