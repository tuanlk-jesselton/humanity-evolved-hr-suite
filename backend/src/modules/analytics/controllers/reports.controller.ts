import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { CreateReportsDto } from '../dtos/create-reports.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Body() dto: CreateReportsDto) {
    return this.reportsService.create(dto);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateReportsDto>) {
    return this.reportsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reportsService.remove(id);
  }
}
