import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxForm } from '../entities/tax-form.entity';
import { CreateTaxFormDto } from '../dtos/create-tax-form.dto';

@Injectable()
export class TaxFormService {
  constructor(
    @InjectRepository(TaxForm)
    private taxFormRepository: Repository<TaxForm>,
  ) {}

  async create(dto: CreateTaxFormDto): Promise<TaxForm> {
    const entity = this.taxFormRepository.create(dto);
    return this.taxFormRepository.save(entity);
  }

  async findAll(): Promise<TaxForm[]> {
    return this.taxFormRepository.find();
  }

  async findOne(id: number): Promise<TaxForm> {
    return this.taxFormRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateTaxFormDto>): Promise<TaxForm> {
    await this.taxFormRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.taxFormRepository.delete(id);
  }
}
