
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { PayrollRun } from './payroll-run.entity';
import { Employee } from './employee.entity';

export enum PayslipItemType {
  EARNING = 'earning',
  DEDUCTION = 'deduction',
  TAX = 'tax',
  BENEFIT = 'benefit',
}

@Entity('payslip_items')
export class PayslipItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  payroll_run_id!: number;

  @ManyToOne(() => PayrollRun, payrollRun => payrollRun.payslipItems)
  @JoinColumn({ name: 'payroll_run_id' })
  payrollRun!: PayrollRun;

  @Column()
  employee_id!: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: PayslipItemType,
    default: PayslipItemType.EARNING,
  })
  type!: PayslipItemType;

  @Column('decimal', { precision: 12, scale: 2 })
  amount!: number;

  @Column({ nullable: true })
  reference?: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  created_at!: Date;
}
