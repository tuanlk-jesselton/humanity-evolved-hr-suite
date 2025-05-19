import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roster } from './entities/roster.entity';
import { AttendanceRecord } from './entities/attendance-record.entity';
import { AttendanceRecordController } from './controllers/attendance-record.controller';
import { RosterController } from './controllers/roster.controller';
import { AttendanceRecordService } from './services/attendance-record.service';
import { RosterService } from './services/roster.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roster, AttendanceRecord])],
  controllers: [AttendanceRecordController, RosterController],
  providers: [AttendanceRecordService, RosterService],
})
export class AttendanceModule {}