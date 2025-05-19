import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TaxIntegrationService } from '../services/tax-integration.service';
import { CreateTaxIntegrationDto } from '../dtos/create-tax-integration.dto';

@Controller('tax-integrations')
export class TaxIntegrationController {
  constructor(private readonly taxIntegrationService: TaxIntegrationService) {}

  @Post()
  create(@Body() dto: CreateTaxIntegrationDto) {
    return this.taxIntegrationService.create(dto);
  }

  @Get()
  findAll() {
    return this.taxIntegrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taxIntegrationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateTaxIntegrationDto>) {
    return this.taxIntegrationService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taxIntegrationService.remove(id);
  }
}
