import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformanceReview } from '../entities/performance-review.entity';
import { CreatePerformanceReviewDto } from '../dtos/create-performance-review.dto';

@Injectable()
export class PerformanceReviewService {
  constructor(
    @InjectRepository(PerformanceReview)
    private performanceReviewRepository: Repository<PerformanceReview>,
  ) {}

  async create(dto: CreatePerformanceReviewDto): Promise<PerformanceReview> {
    const entity = this.performanceReviewRepository.create(dto);
    return this.performanceReviewRepository.save(entity);
  }

  async findAll(): Promise<PerformanceReview[]> {
    return this.performanceReviewRepository.find();
  }

  async findOne(id: number): Promise<PerformanceReview> {
    return this.performanceReviewRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreatePerformanceReviewDto>): Promise<PerformanceReview> {
    await this.performanceReviewRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.performanceReviewRepository.delete(id);
  }
}
