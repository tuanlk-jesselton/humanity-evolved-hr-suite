import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionPlan } from '../entities/subscription-plan.entity';
import { CreateSubscriptionPlanDto } from '../dtos/create-subscription-plan.dto';

@Injectable()
export class SubscriptionPlanService {
  constructor(
    @InjectRepository(SubscriptionPlan)
    private subscriptionPlanRepository: Repository<SubscriptionPlan>,
  ) {}

  async create(dto: CreateSubscriptionPlanDto): Promise<SubscriptionPlan> {
    const entity = this.subscriptionPlanRepository.create(dto);
    return this.subscriptionPlanRepository.save(entity);
  }

  async findAll(): Promise<SubscriptionPlan[]> {
    return this.subscriptionPlanRepository.find();
  }

  async findOne(id: number): Promise<SubscriptionPlan> {
    return this.subscriptionPlanRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateSubscriptionPlanDto>): Promise<SubscriptionPlan> {
    await this.subscriptionPlanRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.subscriptionPlanRepository.delete(id);
  }
}
