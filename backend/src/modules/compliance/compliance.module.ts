import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Import controllers and services here as needed
import { ContributionRecordController } from './controllers/contribution-record.controller';
import { ContributionRecordService } from './services/contribution-record.service';
import { ContributionRecord } from './entities/contribution-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContributionRecord])],
  controllers: [ContributionRecordController],
  providers: [ContributionRecordService],
})
export class ComplianceModule {}
