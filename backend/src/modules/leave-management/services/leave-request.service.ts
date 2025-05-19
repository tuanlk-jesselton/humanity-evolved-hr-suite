import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveRequest } from '../entities/leave-request.entity';
import { CreateLeaveRequestDto } from '../dtos/create-leave-request.dto';

@Injectable()
export class LeaveRequestService {
  constructor(
    @InjectRepository(LeaveRequest)
    private leaveRequestRepository: Repository<LeaveRequest>,
  ) {}

  async create(dto: CreateLeaveRequestDto): Promise<LeaveRequest> {
    const entity = this.leaveRequestRepository.create(dto);
    return this.leaveRequestRepository.save(entity);
  }

  async findAll(): Promise<LeaveRequest[]> {
    return this.leaveRequestRepository.find();
  }

  async findOne(id: number): Promise<LeaveRequest> {
    return this.leaveRequestRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateLeaveRequestDto>): Promise<LeaveRequest> {
    await this.leaveRequestRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.leaveRequestRepository.delete(id);
  }
}
