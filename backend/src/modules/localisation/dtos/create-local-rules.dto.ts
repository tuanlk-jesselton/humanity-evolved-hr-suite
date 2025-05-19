import { IsString, IsOptional } from 'class-validator';

export class CreateLocalRulesDto {
  @IsString()
  countryCode: string;

  @IsString()
  ruleName: string;

  @IsOptional()
  @IsString()
  ruleValue?: string;
}
