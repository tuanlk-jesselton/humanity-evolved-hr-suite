import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PerformanceReviewService } from '../services/performance-review.service';
import { CreatePerformanceReviewDto } from '../dtos/create-performance-review.dto';

@Controller('performance-reviews')
export class PerformanceReviewController {
  constructor(private readonly performanceReviewService: PerformanceReviewService) {}

  @Post()
  create(@Body() dto: CreatePerformanceReviewDto) {
    return this.performanceReviewService.create(dto);
  }

  @Get()
  findAll() {
    return this.performanceReviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.performanceReviewService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreatePerformanceReviewDto>) {
    return this.performanceReviewService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.performanceReviewService.remove(id);
  }
}
