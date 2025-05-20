
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';
import { LeaveType } from '../entities/leave-type.entity';
import { LeaveRequest } from '../entities/leave-request.entity';
import { Employee } from '../entities/employee.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LeaveType,
      LeaveRequest,
      Employee,
      User,
    ]),
  ],
  controllers: [LeaveController],
  providers: [LeaveService],
  exports: [LeaveService],
})
export class LeaveModule {}
