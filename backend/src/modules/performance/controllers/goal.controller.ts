import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { GoalService } from '../services/goal.service';
import { CreateGoalDto } from '../dtos/create-goal.dto';

@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  create(@Body() dto: CreateGoalDto) {
    return this.goalService.create(dto);
  }

  @Get()
  findAll() {
    return this.goalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.goalService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateGoalDto>) {
    return this.goalService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.goalService.remove(id);
  }
}
