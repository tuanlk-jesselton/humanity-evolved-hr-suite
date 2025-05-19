import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CustomFieldService } from '../services/custom-field.service';
import { CreateCustomFieldDto } from '../dtos/create-custom-field.dto';

@Controller('custom-fields')
export class CustomFieldController {
  constructor(private readonly customFieldService: CustomFieldService) {}

  @Get()
  findAll() {
    return this.customFieldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customFieldService.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateCustomFieldDto) {
    return this.customFieldService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: Partial<CreateCustomFieldDto>) {
    return this.customFieldService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customFieldService.remove(id);
  }
}
