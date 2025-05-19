import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { LeaveRequestService } from '../services/leave-request.service';
import { CreateLeaveRequestDto } from '../dtos/create-leave-request.dto';

@Controller('leave-requests')
export class LeaveRequestController {
  constructor(private readonly leaveRequestService: LeaveRequestService) {}

  @Post()
  create(@Body() dto: CreateLeaveRequestDto) {
    return this.leaveRequestService.create(dto);
  }

  @Get()
  findAll() {
    return this.leaveRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.leaveRequestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateLeaveRequestDto>) {
    return this.leaveRequestService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.leaveRequestService.remove(id);
  }
}
