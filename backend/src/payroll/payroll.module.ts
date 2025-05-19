
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollController } from './payroll.controller';
import { PayrollService } from './payroll.service';
import { PayrollCycle } from '../entities/payroll-cycle.entity';
import { PayrollRun } from '../entities/payroll-run.entity';
import { PayslipItem } from '../entities/payslip-item.entity';
import { Employee } from '../entities/employee.entity';
import { Salary } from '../entities/salary.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PayrollCycle,
      PayrollRun,
      PayslipItem,
      Employee,
      Salary,
      User,
    ]),
  ],
  controllers: [PayrollController],
  providers: [PayrollService],
  exports: [PayrollService],
})
export class PayrollModule {}
