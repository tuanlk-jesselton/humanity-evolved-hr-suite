/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsageTrackingService } from '../services/usage-tracking.service';
import { CreateUsageTrackingDto } from '../dtos/create-usage-tracking.dto';

@Controller('usage-tracking')
export class UsageTrackingController {
  constructor(private readonly usageTrackingService: UsageTrackingService) {}

  @Post()
  create(@Body() dto: CreateUsageTrackingDto) {
    return this.usageTrackingService.create(dto);
  }

  @Get()
  findAll() {
    return this.usageTrackingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usageTrackingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateUsageTrackingDto>) {
    return this.usageTrackingService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usageTrackingService.remove(id);
  }
}
