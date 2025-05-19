import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AIInsightsService } from '../services/ai-insights.service';
import { CreateAIInsightsDto } from '../dtos/create-ai-insights.dto';

@Controller('ai-insights')
export class AIInsightsController {
  constructor(private readonly aiInsightsService: AIInsightsService) {}

  @Post()
  create(@Body() dto: CreateAIInsightsDto) {
    return this.aiInsightsService.create(dto);
  }

  @Get()
  findAll() {
    return this.aiInsightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.aiInsightsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateAIInsightsDto>) {
    return this.aiInsightsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.aiInsightsService.remove(id);
  }
}
