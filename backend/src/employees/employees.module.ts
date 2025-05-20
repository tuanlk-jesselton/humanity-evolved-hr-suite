
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from '../entities/employee.entity';
import { User } from '../auth/entities/user.entity';
import { Department } from '../entities/department.entity';
import { EmploymentDetail } from '../entities/employment-detail.entity';
import { Salary } from '../entities/salary.entity';
import { Document } from '../entities/document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      User,
      Department,
      EmploymentDetail,
      Salary,
      Document,
    ]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
