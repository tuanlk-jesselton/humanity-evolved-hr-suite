import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TaskChecklistService } from '../services/task-checklist.service';
import { CreateTaskChecklistDto } from '../dtos/create-task-checklist.dto';

@Controller('task-checklists')
export class TaskChecklistController {
  constructor(private readonly taskChecklistService: TaskChecklistService) {}

  @Post()
  create(@Body() dto: CreateTaskChecklistDto) {
    return this.taskChecklistService.create(dto);
  }

  @Get()
  findAll() {
    return this.taskChecklistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskChecklistService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateTaskChecklistDto>) {
    return this.taskChecklistService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taskChecklistService.remove(id);
  }
}
