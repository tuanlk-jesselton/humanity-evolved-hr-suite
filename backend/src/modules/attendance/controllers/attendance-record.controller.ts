import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AttendanceRecordService } from '../services/attendance-record.service';
import { CreateAttendanceRecordDto } from '../dtos/create-attendance-record.dto';

@Controller('attendance-records')
export class AttendanceRecordController {
  constructor(private readonly attendanceRecordService: AttendanceRecordService) {}

  @Post()
  create(@Body() dto: CreateAttendanceRecordDto) {
    return this.attendanceRecordService.create(dto);
  }

  @Get()
  findAll() {
    return this.attendanceRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.attendanceRecordService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateAttendanceRecordDto>) {
    return this.attendanceRecordService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.attendanceRecordService.remove(id);
  }
}
