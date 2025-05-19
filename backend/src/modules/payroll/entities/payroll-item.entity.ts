import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PayrollRun } from './payroll-run.entity';
import { Employee } from '../../core-hr/entities/employee.entity';
import { PayItemType } from './pay-item-type.entity';

@Entity('payroll_item')
export class PayrollItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PayrollRun, payrollRun => payrollRun.items)
  @JoinColumn({ name: 'payroll_run_id' })
  payrollRun: PayrollRun;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @ManyToOne(() => PayItemType)
  @JoinColumn({ name: 'pay_item_type_id' })
  payItemType: PayItemType;
}
