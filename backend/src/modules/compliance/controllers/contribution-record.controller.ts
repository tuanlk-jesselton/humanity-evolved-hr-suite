import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ContributionRecordService } from '../services/contribution-record.service';
import { CreateContributionRecordDto } from '../dtos/create-contribution-record.dto';

@Controller('contribution-records')
export class ContributionRecordController {
  constructor(
    private readonly contributionRecordService: ContributionRecordService,
  ) {}

  @Post()
  create(@Body() dto: CreateContributionRecordDto) {
    return this.contributionRecordService.create(dto);
  }

  @Get()
  findAll() {
    return this.contributionRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contributionRecordService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: Partial<CreateContributionRecordDto>,
  ) {
    return this.contributionRecordService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contributionRecordService.remove(id);
  }
}
