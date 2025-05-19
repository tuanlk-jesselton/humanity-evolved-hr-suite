import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PayrollItemService } from '../services/payroll-item.service';
import { CreatePayrollItemDto } from '../dtos/create-payroll-item.dto';

@Controller('payroll-item')
export class PayrollItemController {
  constructor(private readonly payrollItemService: PayrollItemService) {}

  @Post()
  create(@Body() dto: CreatePayrollItemDto) {
    return this.payrollItemService.create(dto);
  }

  @Get()
  findAll() {
    return this.payrollItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.payrollItemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreatePayrollItemDto>) {
    return this.payrollItemService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.payrollItemService.remove(id);
  }
}
