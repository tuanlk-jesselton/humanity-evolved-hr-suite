/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountrySettings } from '../entities/country-settings.entity';
import { CreateCountrySettingsDto } from '../dtos/create-country-settings.dto';

@Injectable()
export class CountrySettingsService {
  constructor(
    @InjectRepository(CountrySettings)
    private countrySettingsRepository: Repository<CountrySettings>,
  ) {}

  async create(dto: CreateCountrySettingsDto): Promise<CountrySettings> {
    const entity = this.countrySettingsRepository.create(dto);
    return this.countrySettingsRepository.save(entity);
  }

  async findAll(): Promise<CountrySettings[]> {
    return this.countrySettingsRepository.find();
  }

  async findOne(id: number): Promise<CountrySettings> {
    return this.countrySettingsRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateCountrySettingsDto>): Promise<CountrySettings> {
    await this.countrySettingsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.countrySettingsRepository.delete(id);
  }
}
