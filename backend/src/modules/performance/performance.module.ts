import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalController } from './controllers/goal.controller';
import { PerformanceReviewController } from './controllers/performance-review.controller';
import { GoalService } from './services/goal.service';
import { PerformanceReviewService } from './services/performance-review.service';
import { Goal } from './entities/goal.entity';
import { PerformanceReview } from './entities/performance-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Goal, PerformanceReview])],
  controllers: [GoalController, PerformanceReviewController],
  providers: [GoalService, PerformanceReviewService],
})
export class PerformanceModule {}
