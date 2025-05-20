
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { LeaveType } from './leave-type.entity';
import { User } from '../auth/entities/user.entity';

export enum LeaveStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

@Entity('leave_requests')
export class LeaveRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  employee_id!: number;

  @ManyToOne(() => Employee, employee => employee.leaveRequests)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;

  @Column()
  leave_type_id!: number;

  @ManyToOne(() => LeaveType, leaveType => leaveType.leaveRequests)
  @JoinColumn({ name: 'leave_type_id' })
  leaveType!: LeaveType;

  @Column({ type: 'date' })
  start_date!: Date;

  @Column({ type: 'date' })
  end_date!: Date;

  @Column('decimal', { precision: 5, scale: 2 })
  days!: number;

  @Column({
    type: 'enum',
    enum: LeaveStatus,
    default: LeaveStatus.PENDING,
  })
  status!: LeaveStatus;

  @Column({ nullable: true })
  reason?: string;

  @Column({ nullable: true })
  comments?: string;

  @Column({ nullable: true })
  attachment?: string;

  @Column({ nullable: true })
  approved_by?: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approver?: User;

  @Column({ nullable: true, type: 'timestamp' })
  approved_at?: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
