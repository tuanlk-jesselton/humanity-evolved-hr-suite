/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ExitChecklistService } from '../services/exit-checklist.service';
import { CreateExitChecklistDto } from '../dtos/create-exit-checklist.dto';

@Controller('exit-checklists')
export class ExitChecklistController {
  constructor(private readonly exitChecklistService: ExitChecklistService) {}

  @Post()
  create(@Body() dto: CreateExitChecklistDto) {
    return this.exitChecklistService.create(dto);
  }

  @Get()
  findAll() {
    return this.exitChecklistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.exitChecklistService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateExitChecklistDto>) {
    return this.exitChecklistService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.exitChecklistService.remove(id);
  }
}
