import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reports } from '../entities/reports.entity';
import { CreateReportsDto } from '../dtos/create-reports.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Reports)
    private reportsRepository: Repository<Reports>,
  ) {}

  async create(dto: CreateReportsDto): Promise<Reports> {
    const entity = this.reportsRepository.create(dto);
    return this.reportsRepository.save(entity);
  }

  async findAll(): Promise<Reports[]> {
    return this.reportsRepository.find();
  }

  async findOne(id: number): Promise<Reports> {
    return this.reportsRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateReportsDto>): Promise<Reports> {
    await this.reportsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.reportsRepository.delete(id);
  }
}
