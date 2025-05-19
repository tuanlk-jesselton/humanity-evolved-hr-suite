import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecuritySettings } from './entities/security-settings.entity';
import { UserConsent } from './entities/user-consent.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SecuritySettings, UserConsent])],
  controllers: [],
  providers: [],
})
export class SecurityModule {}
