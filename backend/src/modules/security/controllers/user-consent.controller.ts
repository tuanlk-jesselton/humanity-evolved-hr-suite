/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserConsentService } from '../services/user-consent.service';
import { CreateUserConsentDto } from '../dtos/create-user-consent.dto';

@Controller('user-consents')
export class UserConsentController {
  constructor(private readonly userConsentService: UserConsentService) {}

  @Post()
  create(@Body() dto: CreateUserConsentDto) {
    return this.userConsentService.create(dto);
  }

  @Get()
  findAll() {
    return this.userConsentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userConsentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateUserConsentDto>) {
    return this.userConsentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userConsentService.remove(id);
  }
}
