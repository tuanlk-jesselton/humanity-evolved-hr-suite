import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsageTracking } from '../entities/usage-tracking.entity';
import { CreateUsageTrackingDto } from '../dtos/create-usage-tracking.dto';

@Injectable()
export class UsageTrackingService {
  constructor(
    @InjectRepository(UsageTracking)
    private usageTrackingRepository: Repository<UsageTracking>,
  ) {}

  async create(dto: CreateUsageTrackingDto): Promise<UsageTracking> {
    const entity = this.usageTrackingRepository.create(dto);
    return this.usageTrackingRepository.save(entity);
  }

  async findAll(): Promise<UsageTracking[]> {
    return this.usageTrackingRepository.find();
  }

  async findOne(id: number): Promise<UsageTracking> {
    return this.usageTrackingRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateUsageTrackingDto>): Promise<UsageTracking> {
    await this.usageTrackingRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usageTrackingRepository.delete(id);
  }
}
