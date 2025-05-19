import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SubscriptionPlan } from './subscription-plan.entity';

@Entity('usage_tracking')
export class UsageTracking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SubscriptionPlan)
  @JoinColumn({ name: 'subscription_id' })
  subscription: SubscriptionPlan;

  @Column({ length: 50 })
  usageType: string;

  @Column('decimal', { precision: 15, scale: 2 })
  usageAmount: number;
}
