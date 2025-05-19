import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskChecklistController } from './controllers/task-checklist.controller';
import { TaskChecklistService } from './services/task-checklist.service';
import { TaskChecklist } from './entities/task-checklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskChecklist])],
  controllers: [TaskChecklistController],
  providers: [TaskChecklistService],
})
export class OnboardingModule {}
