import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AIInsights } from '../entities/ai-insights.entity';
import { CreateAIInsightsDto } from '../dtos/create-ai-insights.dto';

@Injectable()
export class AIInsightsService {
  constructor(
    @InjectRepository(AIInsights)
    private aiInsightsRepository: Repository<AIInsights>,
  ) {}

  async create(dto: CreateAIInsightsDto): Promise<AIInsights> {
    const entity = this.aiInsightsRepository.create(dto);
    return this.aiInsightsRepository.save(entity);
  }

  async findAll(): Promise<AIInsights[]> {
    return this.aiInsightsRepository.find();
  }

  async findOne(id: number): Promise<AIInsights> {
    return this.aiInsightsRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateAIInsightsDto>): Promise<AIInsights> {
    await this.aiInsightsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.aiInsightsRepository.delete(id);
  }
}
