import { IsString, IsNumber, IsObject } from 'class-validator';

export class CreateSubscriptionPlanDto {
  @IsString()
  planName: string;

  @IsNumber()
  pricePerMonth: number;

  @IsObject()
  featuresJson: object;
}
