/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { BillingRecordService } from '../services/billing-record.service';
import { CreateBillingRecordDto } from '../dtos/create-billing-record.dto';

@Controller('billing-records')
export class BillingRecordController {
  constructor(private readonly billingRecordService: BillingRecordService) {}

  @Post()
  create(@Body() dto: CreateBillingRecordDto) {
    return this.billingRecordService.create(dto);
  }

  @Get()
  findAll() {
    return this.billingRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.billingRecordService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateBillingRecordDto>) {
    return this.billingRecordService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.billingRecordService.remove(id);
  }
}
