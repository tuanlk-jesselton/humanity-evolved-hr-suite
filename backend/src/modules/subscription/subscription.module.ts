import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlan } from './entities/subscription-plan.entity';
import { UsageTracking } from './entities/usage-tracking.entity';
import { BillingRecord } from './entities/billing-record.entity';
import { SubscriptionPlanController } from './controllers/subscription-plan.controller';
import { UsageTrackingController } from './controllers/usage-tracking.controller';
import { SubscriptionPlanService } from './services/subscription-plan.service';
import { UsageTrackingService } from './services/usage-tracking.service';
@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlan, UsageTracking, BillingRecord])],
  controllers: [SubscriptionPlanController, UsageTrackingController],
  providers: [SubscriptionPlanService, UsageTrackingService],
})
export class SubscriptionModule {}
