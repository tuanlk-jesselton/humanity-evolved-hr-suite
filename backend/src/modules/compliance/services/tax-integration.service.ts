import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxIntegration } from '../entities/tax-integration.entity';
import { CreateTaxIntegrationDto } from '../dtos/create-tax-integration.dto';

@Injectable()
export class TaxIntegrationService {
  constructor(
    @InjectRepository(TaxIntegration)
    private taxIntegrationRepository: Repository<TaxIntegration>,
  ) {}

  async create(dto: CreateTaxIntegrationDto): Promise<TaxIntegration> {
    const entity = this.taxIntegrationRepository.create(dto);
    return this.taxIntegrationRepository.save(entity);
  }

  async findAll(): Promise<TaxIntegration[]> {
    return this.taxIntegrationRepository.find();
  }

  async findOne(id: number): Promise<TaxIntegration> {
    return this.taxIntegrationRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateTaxIntegrationDto>): Promise<TaxIntegration> {
    await this.taxIntegrationRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.taxIntegrationRepository.delete(id);
  }
}
