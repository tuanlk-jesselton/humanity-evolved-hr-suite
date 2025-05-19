/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CountrySettingsService } from '../services/country-settings.service';
import { CreateCountrySettingsDto } from '../dtos/create-country-settings.dto';

@Controller('country-settings')
export class CountrySettingsController {
  constructor(private readonly countrySettingsService: CountrySettingsService) {}

  @Post()
  create(@Body() dto: CreateCountrySettingsDto) {
    return this.countrySettingsService.create(dto);
  }

  @Get()
  findAll() {
    return this.countrySettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.countrySettingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateCountrySettingsDto>) {
    return this.countrySettingsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.countrySettingsService.remove(id);
  }
}
