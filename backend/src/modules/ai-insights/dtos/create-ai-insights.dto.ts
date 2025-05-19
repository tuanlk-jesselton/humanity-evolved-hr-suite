import { IsString, IsInt } from 'class-validator';

export class CreateAIInsightsDto {
  @IsString()
  insightType: string;

  @IsInt()
  referenceId: number;

  @IsString()
  summary: string;
}
