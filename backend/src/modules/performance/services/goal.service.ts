import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from '../entities/goal.entity';
import { CreateGoalDto } from '../dtos/create-goal.dto';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,
  ) {}

  async create(dto: CreateGoalDto): Promise<Goal> {
    const entity = this.goalRepository.create(dto);
    return this.goalRepository.save(entity);
  }

  async findAll(): Promise<Goal[]> {
    return this.goalRepository.find();
  }

  async findOne(id: number): Promise<Goal> {
    return this.goalRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateGoalDto>): Promise<Goal> {
    await this.goalRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.goalRepository.delete(id);
  }
}
