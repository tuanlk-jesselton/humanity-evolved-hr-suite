
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { Benefit } from './benefit.entity';

@Entity('employee_benefits')
export class EmployeeBenefit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  employee_id!: number;

  @ManyToOne(() => Employee, employee => employee.employeeBenefits)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;

  @Column()
  benefit_id!: number;

  @ManyToOne(() => Benefit, benefit => benefit.employeeBenefits)
  @JoinColumn({ name: 'benefit_id' })
  benefit!: Benefit;

  @Column({ type: 'date' })
  enrollment_date!: Date;

  @Column({ type: 'date', nullable: true })
  end_date?: Date;

  @Column({ nullable: true })
  coverage_level?: string;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  employee_contribution!: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  employer_contribution!: number;

  @Column({ default: true })
  active!: boolean;

  @Column({ nullable: true })
  notes?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
