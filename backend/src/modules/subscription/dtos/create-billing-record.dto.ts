import { IsInt, IsNumber, IsDateString } from 'class-validator';

export class CreateBillingRecordDto {
  @IsInt()
  subscriptionId: number;

  @IsNumber()
  amountPaid: number;

  @IsDateString()
  paymentDate: string;
}
