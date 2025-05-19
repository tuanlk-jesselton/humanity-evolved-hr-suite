import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { EmployeeCustomFieldValueService } from '../services/employee-custom-field-value.service';
import { CreateEmployeeCustomFieldValueDto } from '../dtos/create-employee-custom-field-value.dto';

@Controller('employee-custom-field-values')
export class EmployeeCustomFieldValueController {
  constructor(private readonly valueService: EmployeeCustomFieldValueService) {}

  @Get()
  findAll() {
    return this.valueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.valueService.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateEmployeeCustomFieldValueDto) {
    return this.valueService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDto: Partial<CreateEmployeeCustomFieldValueDto>) {
    return this.valueService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.valueService.remove(id);
  }
}
