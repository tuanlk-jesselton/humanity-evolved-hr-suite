/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { LocalRulesService } from '../services/local-rules.service';
import { CreateLocalRulesDto } from '../dtos/create-local-rules.dto';

@Controller('local-rules')
export class LocalRulesController {
  constructor(private readonly localRulesService: LocalRulesService) {}

  @Post()
  create(@Body() dto: CreateLocalRulesDto) {
    return this.localRulesService.create(dto);
  }

  @Get()
  findAll() {
    return this.localRulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.localRulesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateLocalRulesDto>) {
    return this.localRulesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.localRulesService.remove(id);
  }
}
