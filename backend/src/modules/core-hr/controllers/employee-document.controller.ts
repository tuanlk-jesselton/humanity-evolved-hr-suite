import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { EmployeeDocumentService } from '../services/employee-document.service';
import { CreateEmployeeDocumentDto } from '../dtos/create-employee-document.dto';

@Controller('documents')
export class EmployeeDocumentController {
  constructor(
    private readonly employeeDocumentService: EmployeeDocumentService,
  ) {}

  @Get()
  findAll() {
    return this.employeeDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeDocumentService.findOne(id);
  }

  @Post()
  create(@Body() createEmployeeDocumentDto: CreateEmployeeDocumentDto) {
    return this.employeeDocumentService.create(createEmployeeDocumentDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateEmployeeDocumentDto>,
  ) {
    return this.employeeDocumentService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.employeeDocumentService.remove(id);
  }
}
