import { IsInt, IsString } from 'class-validator';

export class CreateBankTransferBatchDto {
  @IsInt()
  payrollRunId: number;

  @IsString()
  fileUrl: string;
}
