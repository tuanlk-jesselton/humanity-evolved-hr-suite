import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationSettingsController } from './controllers/integration-settings.controller';
import { IntegrationSettingsService } from './services/integration-settings.service';
import { IntegrationSettings } from './entities/integration-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IntegrationSettings])],
  controllers: [IntegrationSettingsController],
  providers: [IntegrationSettingsService],
})
export class IntegrationsModule {}
