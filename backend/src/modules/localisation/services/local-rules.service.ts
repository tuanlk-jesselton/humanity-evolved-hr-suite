/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalRules } from '../entities/local-rules.entity';
import { CreateLocalRulesDto } from '../dtos/create-local-rules.dto';

@Injectable()
export class LocalRulesService {
  constructor(
    @InjectRepository(LocalRules)
    private localRulesRepository: Repository<LocalRules>,
  ) {}

  async create(dto: CreateLocalRulesDto): Promise<LocalRules> {
    const entity = this.localRulesRepository.create(dto);
    return this.localRulesRepository.save(entity);
  }

  async findAll(): Promise<LocalRules[]> {
    return this.localRulesRepository.find();
  }

  async findOne(id: number): Promise<LocalRules> {
    return this.localRulesRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateLocalRulesDto>): Promise<LocalRules> {
    await this.localRulesRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.localRulesRepository.delete(id);
  }
}
