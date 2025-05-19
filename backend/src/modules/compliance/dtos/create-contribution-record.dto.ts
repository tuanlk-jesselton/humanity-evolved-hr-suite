import { IsInt, IsString, IsNumber } from 'class-validator';

export class CreateContributionRecordDto {
  @IsInt()
  employeeId: number;

  @IsString()
  contributionType: string;

  @IsNumber()
  amount: number;

  @IsString()
  month: string;
}
