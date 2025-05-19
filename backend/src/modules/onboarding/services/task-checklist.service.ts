import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskChecklist } from '../entities/task-checklist.entity';
import { CreateTaskChecklistDto } from '../dtos/create-task-checklist.dto';

@Injectable()
export class TaskChecklistService {
  constructor(
    @InjectRepository(TaskChecklist)
    private taskChecklistRepository: Repository<TaskChecklist>,
  ) {}

  async create(dto: CreateTaskChecklistDto): Promise<TaskChecklist> {
    const entity = this.taskChecklistRepository.create(dto);
    return this.taskChecklistRepository.save(entity);
  }

  async findAll(): Promise<TaskChecklist[]> {
    return this.taskChecklistRepository.find();
  }

  async findOne(id: number): Promise<TaskChecklist> {
    return this.taskChecklistRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateTaskChecklistDto>): Promise<TaskChecklist> {
    await this.taskChecklistRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.taskChecklistRepository.delete(id);
  }
}
