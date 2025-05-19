import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PayrollRunService } from '../services/payroll-run.service';
import { CreatePayrollRunDto } from '../dtos/create-payroll-run.dto';

@Controller('payroll-run')
export class PayrollRunController {
  constructor(private readonly payrollRunService: PayrollRunService) {}

  @Post()
  create(@Body() dto: CreatePayrollRunDto) {
    return this.payrollRunService.create(dto);
  }

  @Get()
  findAll() {
    return this.payrollRunService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.payrollRunService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreatePayrollRunDto>) {
    return this.payrollRunService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.payrollRunService.remove(id);
  }
}
