import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './controllers/reports.controller';
import { ReportsService } from './services/reports.service';
import { Reports } from './entities/reports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reports])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class AnalyticsModule {}
