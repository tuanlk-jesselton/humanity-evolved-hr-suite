import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { LegalDocumentService } from '../services/legal-document.service';
import { CreateLegalDocumentDto } from '../dtos/create-legal-document.dto';

@Controller('legal-documents')
export class LegalDocumentController {
  constructor(private readonly legalDocumentService: LegalDocumentService) {}

  @Post()
  create(@Body() dto: CreateLegalDocumentDto) {
    return this.legalDocumentService.create(dto);
  }

  @Get()
  findAll() {
    return this.legalDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.legalDocumentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateLegalDocumentDto>) {
    return this.legalDocumentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.legalDocumentService.remove(id);
  }
}
