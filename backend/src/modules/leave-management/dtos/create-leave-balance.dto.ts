import { IsInt, IsNumber } from 'class-validator';

export class CreateLeaveBalanceDto {
  @IsInt()
  employeeId: number;

  @IsInt()
  leaveTypeId: number;

  @IsNumber()
  balanceDays: number;
}
