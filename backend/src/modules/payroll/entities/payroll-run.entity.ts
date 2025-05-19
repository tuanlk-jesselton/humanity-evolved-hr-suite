import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Employee } from '../../core-hr/entities/employee.entity';
import { PayrollItem } from './payroll-item.entity';

@Entity('payroll_run')
export class PayrollRun {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column({ length: 50 })
  status: string;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy?: Employee;

  @OneToMany(() => PayrollItem, item => item.payrollRun)
  items?: PayrollItem[];
}
