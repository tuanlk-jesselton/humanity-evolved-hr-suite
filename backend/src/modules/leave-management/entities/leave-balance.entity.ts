import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from '../../core-hr/entities/employee.entity';
import { LeaveType } from './leave-type.entity';

@Entity('leave_balance')
export class LeaveBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => LeaveType)
  @JoinColumn({ name: 'leave_type_id' })
  leaveType: LeaveType;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  balanceDays: number;
}
