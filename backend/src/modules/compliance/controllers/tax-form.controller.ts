import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TaxFormService } from '../services/tax-form.service';
import { CreateTaxFormDto } from '../dtos/create-tax-form.dto';

@Controller('tax-forms')
export class TaxFormController {
  constructor(private readonly taxFormService: TaxFormService) {}

  @Post()
  create(@Body() dto: CreateTaxFormDto) {
    return this.taxFormService.create(dto);
  }

  @Get()
  findAll() {
    return this.taxFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taxFormService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateTaxFormDto>) {
    return this.taxFormService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taxFormService.remove(id);
  }
}
