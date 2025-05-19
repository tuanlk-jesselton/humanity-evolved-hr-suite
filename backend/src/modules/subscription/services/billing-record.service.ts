import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingRecord } from '../entities/billing-record.entity';
import { CreateBillingRecordDto } from '../dtos/create-billing-record.dto';

@Injectable()
export class BillingRecordService {
  constructor(
    @InjectRepository(BillingRecord)
    private billingRecordRepository: Repository<BillingRecord>,
  ) {}

  async create(dto: CreateBillingRecordDto): Promise<BillingRecord> {
    const entity = this.billingRecordRepository.create(dto);
    return this.billingRecordRepository.save(entity);
  }

  async findAll(): Promise<BillingRecord[]> {
    return this.billingRecordRepository.find();
  }

  async findOne(id: number): Promise<BillingRecord> {
    return this.billingRecordRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateBillingRecordDto>): Promise<BillingRecord> {
    await this.billingRecordRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.billingRecordRepository.delete(id);
  }
}
