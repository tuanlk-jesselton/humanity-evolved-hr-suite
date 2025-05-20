
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Department } from './department.entity';
import { User } from '../auth/entities/user.entity';
import { PayrollCycle } from './payroll-cycle.entity';
import { LeaveType } from './leave-type.entity';
import { Benefit } from './benefit.entity';
import { JobPosting } from './job-posting.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true }) // Nếu muốn bắt buộc không được null
  name: string;

  @Column({ type: 'json', nullable: true })
  address?: any;

  @Column({ nullable: true })
  logo_url?: string;

  @Column({ nullable: true })
  industry?: string;

  @Column({ nullable: true })
  size?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  postal_code?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  tax_id?: string;

  @Column({ nullable: true })
  registration_number?: string;

  @Column({ nullable: true })
  fiscal_year_start?: Date;

  @Column({ type: 'json', nullable: true })
  settings?: Record<string, any>;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Department, department => department.company)
  departments!: Department[];

  @OneToMany(() => User, user => user.company)
  users!: User[];

  @OneToMany(() => PayrollCycle, payrollCycle => payrollCycle.company)
  payrollCycles!: PayrollCycle[];

  @OneToMany(() => LeaveType, leaveType => leaveType.company)
  leaveTypes!: LeaveType[];

  @OneToMany(() => Benefit, benefit => benefit.company)
  benefits!: Benefit[];

  @OneToMany(() => JobPosting, jobPosting => jobPosting.company)
  jobPostings!: JobPosting[];
}
