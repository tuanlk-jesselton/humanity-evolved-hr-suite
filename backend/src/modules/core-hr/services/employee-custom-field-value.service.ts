import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeCustomFieldValue } from '../entities/employee-custom-field-value.entity';
import { CreateEmployeeCustomFieldValueDto } from '../dtos/create-employee-custom-field-value.dto';

@Injectable()
export class EmployeeCustomFieldValueService {
  constructor(
    @InjectRepository(EmployeeCustomFieldValue)
    private valueRepository: Repository<EmployeeCustomFieldValue>,
  ) {}

  async findAll(): Promise<EmployeeCustomFieldValue[]> {
    return this.valueRepository.find({ relations: ['employee', 'customField'] });
  }

  async findOne(id: number): Promise<EmployeeCustomFieldValue> {
    return this.valueRepository.findOne({ where: { id }, relations: ['employee', 'customField'] });
  }

  async create(createDto: CreateEmployeeCustomFieldValueDto): Promise<EmployeeCustomFieldValue> {
    const value = this.valueRepository.create(createDto);
    return this.valueRepository.save(value);
  }

  async update(id: number, updateDto: Partial<CreateEmployeeCustomFieldValueDto>): Promise<EmployeeCustomFieldValue> {
    await this.valueRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.valueRepository.delete(id);
  }
}
