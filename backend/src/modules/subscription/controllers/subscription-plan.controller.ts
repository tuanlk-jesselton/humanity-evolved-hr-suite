import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SubscriptionPlanService } from '../services/subscription-plan.service';
import { CreateSubscriptionPlanDto } from '../dtos/create-subscription-plan.dto';

@Controller('subscription-plans')
export class SubscriptionPlanController {
  constructor(private readonly subscriptionPlanService: SubscriptionPlanService) {}

  @Post()
  create(@Body() dto: CreateSubscriptionPlanDto) {
    return this.subscriptionPlanService.create(dto);
  }

  @Get()
  findAll() {
    return this.subscriptionPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.subscriptionPlanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateSubscriptionPlanDto>) {
    return this.subscriptionPlanService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.subscriptionPlanService.remove(id);
  }
}
