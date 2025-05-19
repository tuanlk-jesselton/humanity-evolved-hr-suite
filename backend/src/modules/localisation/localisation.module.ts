import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountrySettingsController } from './controllers/country-settings.controller';
import { LocalRulesController } from './controllers/local-rules.controller';
import { CountrySettingsService } from './services/country-settings.service';
import { LocalRulesService } from './services/local-rules.service';
import { CountrySettings } from './entities/country-settings.entity';
import { LocalRules } from './entities/local-rules.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountrySettings, LocalRules])],
  controllers: [CountrySettingsController, LocalRulesController],
  providers: [CountrySettingsService, LocalRulesService],
})
export class LocalisationModule {}
