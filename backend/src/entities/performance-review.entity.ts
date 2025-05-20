
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { User } from '../auth/entities/user.entity';
import { Goal } from './goal.entity';

export enum ReviewStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  EMPLOYEE_SUBMITTED = 'employee_submitted',
  MANAGER_REVIEWING = 'manager_reviewing',
  COMPLETED = 'completed',
}

@Entity('performance_reviews')
export class PerformanceReview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  employee_id!: number;

  @ManyToOne(() => Employee, employee => employee.performanceReviews)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;

  @Column()
  reviewer_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewer_id' })
  reviewer!: User;

  @Column()
  title!: string;

  @Column({ nullable: true })
  template_id?: number;

  @Column({ type: 'date' })
  review_period_start!: Date;

  @Column({ type: 'date' })
  review_period_end!: Date;

  @Column({ type: 'date' })
  due_date!: Date;

  @Column({
    type: 'enum',
    enum: ReviewStatus,
    default: ReviewStatus.DRAFT,
  })
  status!: ReviewStatus;

  @Column({ nullable: true })
  self_assessment?: string;

  @Column({ nullable: true })
  manager_assessment?: string;

  @Column({ nullable: true, type: 'decimal', precision: 3, scale: 2 })
  rating?: number;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true, type: 'timestamp' })
  completed_at?: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Goal, goal => goal.performanceReview)
  goals!: Goal[];
}
