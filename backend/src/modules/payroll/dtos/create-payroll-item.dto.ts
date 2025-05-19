import { IsInt, IsNumber } from 'class-validator';

export class CreatePayrollItemDto {
  @IsInt()
  payrollRunId: number;

  @IsInt()
  employeeId: number;

  @IsNumber()
  amount: number;

  @IsInt()
  payItemTypeId: number;
}
