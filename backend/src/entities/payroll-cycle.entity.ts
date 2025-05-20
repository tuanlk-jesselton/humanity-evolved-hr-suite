
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Company } from './company.entity';
import { PayrollRun } from './payroll-run.entity';
import { PaymentFrequency } from './salary.entity';

@Entity('payroll_cycles')
export class PayrollCycle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @ManyToOne(() => Company, company => company.payrollCycles)
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: PaymentFrequency,
    default: PaymentFrequency.MONTHLY,
  })
  frequency!: PaymentFrequency;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'date', nullable: true })
  start_date?: Date;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => PayrollRun, payrollRun => payrollRun.payrollCycle)
  payrollRuns!: PayrollRun[];
}
