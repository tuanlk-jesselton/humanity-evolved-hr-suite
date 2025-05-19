import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequestController } from './controllers/leave-request.controller';
import { LeaveRequestService } from './services/leave-request.service';
import { LeaveRequest } from './entities/leave-request.entity';
import { LeaveType } from './entities/leave-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest, LeaveType])],
  controllers: [LeaveRequestController],
  providers: [LeaveRequestService],
})
export class LeaveManagementModule {}
