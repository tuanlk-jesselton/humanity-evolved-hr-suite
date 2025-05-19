import { IsInt, IsString, IsNumber } from 'class-validator';

export class CreateUsageTrackingDto {
  @IsInt()
  subscriptionId: number;

  @IsString()
  usageType: string;

  @IsNumber()
  usageAmount: number;
}
