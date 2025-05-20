
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { User } from '../auth/entities/user.entity';

export enum TimeEntryStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('time_entries')
export class TimeEntry {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  employee_id!: number;

  @ManyToOne(() => Employee, employee => employee.timeEntries)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'timestamp', nullable: true })
  clock_in?: Date;

  @Column({ type: 'timestamp', nullable: true })
  clock_out?: Date;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  hours!: number;

  @Column({ default: 0 })
  break_minutes!: number;

  @Column({ default: 0 })
  overtime_minutes!: number;

  @Column({ nullable: true })
  notes?: string;

  @Column({
    type: 'enum',
    enum: TimeEntryStatus,
    default: TimeEntryStatus.PENDING,
  })
  status!: TimeEntryStatus;

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
