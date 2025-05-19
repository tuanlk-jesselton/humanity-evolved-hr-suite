import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExitChecklist } from '../entities/exit-checklist.entity';
import { CreateExitChecklistDto } from '../dtos/create-exit-checklist.dto';

@Injectable()
export class ExitChecklistService {
  constructor(
    @InjectRepository(ExitChecklist)
    private exitChecklistRepository: Repository<ExitChecklist>,
  ) {}

  async create(dto: CreateExitChecklistDto): Promise<ExitChecklist> {
    const entity = this.exitChecklistRepository.create(dto);
    return this.exitChecklistRepository.save(entity);
  }

  async findAll(): Promise<ExitChecklist[]> {
    return this.exitChecklistRepository.find();
  }

  async findOne(id: number): Promise<ExitChecklist> {
    return this.exitChecklistRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateExitChecklistDto>): Promise<ExitChecklist> {
    await this.exitChecklistRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.exitChecklistRepository.delete(id);
  }
}
