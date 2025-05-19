import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExitChecklistController } from './controllers/exit-checklist.controller';
import { ExitChecklistService } from './services/exit-checklist.service';
import { ExitChecklist } from './entities/exit-checklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExitChecklist])],
  controllers: [ExitChecklistController],
  providers: [ExitChecklistService],
})
export class OffboardingModule {}
