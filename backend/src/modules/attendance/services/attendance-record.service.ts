import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from '../entities/attendance-record.entity';
import { CreateAttendanceRecordDto } from '../dtos/create-attendance-record.dto';

@Injectable()
export class AttendanceRecordService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
  ) {}

  async create(dto: CreateAttendanceRecordDto): Promise<AttendanceRecord> {
    const entity = this.attendanceRecordRepository.create(dto);
    return this.attendanceRecordRepository.save(entity);
  }

  async findAll(): Promise<AttendanceRecord[]> {
    return this.attendanceRecordRepository.find();
  }

  async findOne(id: number): Promise<AttendanceRecord> {
    return this.attendanceRecordRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateAttendanceRecordDto>): Promise<AttendanceRecord> {
    await this.attendanceRecordRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.attendanceRecordRepository.delete(id);
  }
}
