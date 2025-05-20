
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './employee.entity';

export enum SalaryType {
  HOURLY = 'hourly',
  DAILY = 'daily',
  MONTHLY = 'monthly',
  ANNUAL = 'annual',
}

export enum PaymentFrequency {
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  SEMIMONTHLY = 'semimonthly',
  MONTHLY = 'monthly',
}

@Entity('salaries')
export class Salary {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  employee_id!: number;

  @ManyToOne(() => Employee, employee => employee.salaries)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;

  @Column({ type: 'date' })
  effective_date!: Date;

  @Column({ type: 'date', nullable: true })
  end_date?: Date;

  @Column({
    type: 'enum',
    enum: SalaryType,
    default: SalaryType.MONTHLY,
  })
  salary_type!: SalaryType;

  @Column('decimal', { precision: 12, scale: 2 })
  amount!: number;

  @Column({
    type: 'enum',
    enum: PaymentFrequency,
    default: PaymentFrequency.MONTHLY,
  })
  payment_frequency!: PaymentFrequency;

  @Column({ nullable: true })
  currency?: string;

  @Column({ default: true })
  is_current!: boolean;

  @Column({ nullable: true })
  notes?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
