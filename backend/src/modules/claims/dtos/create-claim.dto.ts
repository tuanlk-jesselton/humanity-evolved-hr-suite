import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateClaimDto {
  @IsInt()
  employeeId: number;

  @IsInt()
  claimCategoryId: number;

  @IsNumber()
  amount: number;

  @IsString()
  status: string;
}
