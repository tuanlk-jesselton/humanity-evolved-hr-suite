/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContributionRecord } from '../entities/contribution-record.entity';
import { CreateContributionRecordDto } from '../dtos/create-contribution-record.dto';

@Injectable()
export class ContributionRecordService {
  constructor(
    @InjectRepository(ContributionRecord)
    private contributionRecordRepository: Repository<ContributionRecord>,
  ) {}

  async create(dto: CreateContributionRecordDto): Promise<ContributionRecord> {
    const entity = this.contributionRecordRepository.create(dto);
    return this.contributionRecordRepository.save(entity);
  }

  async findAll(): Promise<ContributionRecord[]> {
    return this.contributionRecordRepository.find();
  }

  async findOne(id: number): Promise<ContributionRecord> {
    return this.contributionRecordRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateContributionRecordDto>): Promise<ContributionRecord> {
    await this.contributionRecordRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.contributionRecordRepository.delete(id);
  }
}
