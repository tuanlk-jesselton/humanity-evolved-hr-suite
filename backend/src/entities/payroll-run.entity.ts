
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PayrollCycle } from './payroll-cycle.entity';
import { PayslipItem } from './payslip-item.entity';
import { User } from '../auth/entities/user.entity';

export enum PayrollRunStatus {
  DRAFT = 'draft',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  APPROVED = 'approved',
  CANCELLED = 'cancelled',
}

@Entity('payroll_runs')
export class PayrollRun {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  payroll_cycle_id!: number;

  @ManyToOne(() => PayrollCycle, payrollCycle => payrollCycle.payrollRuns)
  @JoinColumn({ name: 'payroll_cycle_id' })
  payrollCycle!: PayrollCycle;

  @Column()
  name!: string;

  @Column({ type: 'date' })
  period_start!: Date;

  @Column({ type: 'date' })
  period_end!: Date;

  @Column({ type: 'date' })
  payment_date!: Date;

  @Column({
    type: 'enum',
    enum: PayrollRunStatus,
    default: PayrollRunStatus.DRAFT,
  })
  status!: PayrollRunStatus;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  total_gross!: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  total_deductions!: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  total_net!: number;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true })
  created_by?: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  creator?: User;

  @Column({ nullable: true })
  approved_by?: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approver?: User;

  @Column({ nullable: true, type: 'timestamp' })
  approved_at?: Date;

  @Column({ default: false })
  locked!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => PayslipItem, payslipItem => payslipItem.payrollRun)
  payslipItems!: PayslipItem[];
}
