import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { IntegrationSettingsService } from '../services/integration-settings.service';
import { CreateIntegrationSettingsDto } from '../dtos/create-integration-settings.dto';

@Controller('integration-settings')
export class IntegrationSettingsController {
  constructor(
    private readonly integrationSettingsService: IntegrationSettingsService,
  ) {}

  @Post()
  create(@Body() dto: CreateIntegrationSettingsDto) {
    return this.integrationSettingsService.create(dto);
  }

  @Get()
  findAll() {
    return this.integrationSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.integrationSettingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: Partial<CreateIntegrationSettingsDto>,
  ) {
    return this.integrationSettingsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.integrationSettingsService.remove(id);
  }
}
