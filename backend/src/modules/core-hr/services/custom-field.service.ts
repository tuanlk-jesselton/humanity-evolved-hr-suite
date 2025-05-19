import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomField } from '../entities/custom-field.entity';
import { CreateCustomFieldDto } from '../dtos/create-custom-field.dto';

@Injectable()
export class CustomFieldService {
  constructor(
    @InjectRepository(CustomField)
    private customFieldRepository: Repository<CustomField>,
  ) {}

  async findAll(): Promise<CustomField[]> {
    return this.customFieldRepository.find({ relations: ['customFieldValues'] });
  }

  async findOne(id: string): Promise<CustomField> {
    return this.customFieldRepository.findOne({ where: { id }, relations: ['customFieldValues'] });
  }

  async create(createDto: CreateCustomFieldDto): Promise<CustomField> {
    const field = this.customFieldRepository.create(createDto);
    return this.customFieldRepository.save(field);
  }

  async update(id: string, updateDto: Partial<CreateCustomFieldDto>): Promise<CustomField> {
    await this.customFieldRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.customFieldRepository.delete(id);
  }
}
