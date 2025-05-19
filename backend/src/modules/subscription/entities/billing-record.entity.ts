import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SubscriptionPlan } from './subscription-plan.entity';

@Entity('billing_record')
export class BillingRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SubscriptionPlan)
  @JoinColumn({ name: 'subscription_id' })
  subscription: SubscriptionPlan;

  @Column('decimal', { precision: 15, scale: 2 })
  amountPaid: number;

  @Column({ type: 'timestamp' })
  paymentDate: Date;
}
