
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { PerformanceReview } from './performance-review.entity';

export enum GoalStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum GoalPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity('goals')
export class Goal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  employee_id!: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;

  @Column({ nullable: true })
  performance_review_id?: number;

  @ManyToOne(() => PerformanceReview, performanceReview => performanceReview.goals, { nullable: true })
  @JoinColumn({ name: 'performance_review_id' })
  performanceReview?: PerformanceReview;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: GoalStatus,
    default: GoalStatus.NOT_STARTED,
  })
  status!: GoalStatus;

  @Column({
    type: 'enum',
    enum: GoalPriority,
    default: GoalPriority.MEDIUM,
  })
  priority!: GoalPriority;

  @Column({ type: 'date', nullable: true })
  due_date?: Date;

  @Column({ nullable: true, default: 0 })
  progress?: number;

  @Column({ nullable: true })
  metrics?: string;

  @Column({ nullable: true })
  category?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
