import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntegrationSettings } from '../entities/integration-settings.entity';
import { CreateIntegrationSettingsDto } from '../dtos/create-integration-settings.dto';

@Injectable()
export class IntegrationSettingsService {
  constructor(
    @InjectRepository(IntegrationSettings)
    private integrationSettingsRepository: Repository<IntegrationSettings>,
  ) {}

  async create(
    dto: CreateIntegrationSettingsDto,
  ): Promise<IntegrationSettings> {
    const entity = this.integrationSettingsRepository.create(dto);
    return this.integrationSettingsRepository.save(entity);
  }

  async findAll(): Promise<IntegrationSettings[]> {
    return this.integrationSettingsRepository.find();
  }

  async findOne(id: number): Promise<IntegrationSettings> {
    return this.integrationSettingsRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    dto: Partial<CreateIntegrationSettingsDto>,
  ): Promise<IntegrationSettings> {
    await this.integrationSettingsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.integrationSettingsRepository.delete(id);
  }
}
