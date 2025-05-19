/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AuditTrailService } from '../services/audit-trail.service';
import { CreateAuditTrailDto } from '../dtos/create-audit-trail.dto';

@Controller('audit-trails')
export class AuditTrailController {
  constructor(private readonly auditTrailService: AuditTrailService) {}

  @Post()
  create(@Body() dto: CreateAuditTrailDto) {
    return this.auditTrailService.create(dto);
  }

  @Get()
  findAll() {
    return this.auditTrailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.auditTrailService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateAuditTrailDto>) {
    return this.auditTrailService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.auditTrailService.remove(id);
  }
}
