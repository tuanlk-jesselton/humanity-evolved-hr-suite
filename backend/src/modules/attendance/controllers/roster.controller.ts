import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { RosterService } from '../services/roster.service';
import { CreateRosterDto } from '../dtos/create-roster.dto';

@Controller('rosters')
export class RosterController {
  constructor(private readonly rosterService: RosterService) {}

  @Post()
  create(@Body() dto: CreateRosterDto) {
    return this.rosterService.create(dto);
  }

  @Get()
  findAll() {
    return this.rosterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rosterService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateRosterDto>) {
    return this.rosterService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rosterService.remove(id);
  }
}
