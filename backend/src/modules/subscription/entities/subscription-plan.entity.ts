import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('subscription_plan')
export class SubscriptionPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  planName: string;

  @Column('decimal', { precision: 15, scale: 2 })
  pricePerMonth: number;

  @Column({ type: 'jsonb' })
  featuresJson: object;
}
