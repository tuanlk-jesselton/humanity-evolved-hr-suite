
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Department } from './department.entity';
import { EmploymentDetail } from './employment-detail.entity';
import { Salary } from './salary.entity';
import { LeaveRequest } from './leave-request.entity';
import { TimeEntry } from './time-entry.entity';
import { EmployeeBenefit } from './employee-benefit.entity';
import { PerformanceReview } from './performance-review.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ nullable: true })
  department_id?: number;

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department?: Department;

  @Column({ nullable: true })
  manager_id?: number;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'manager_id' })
  manager?: Employee;

  @Column({ nullable: true })
  employee_id?: string;

  @Column({ nullable: true })
  job_title?: string;

  @Column({ nullable: true })
  date_of_birth?: Date;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  marital_status?: string;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ nullable: true })
  emergency_contact_name?: string;

  @Column({ nullable: true })
  emergency_contact_phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  postal_code?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  nationality?: string;

  @Column({ nullable: true })
  profile_image?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => EmploymentDetail, employmentDetail => employmentDetail.employee)
  employmentDetails!: EmploymentDetail[];

  @OneToMany(() => Salary, salary => salary.employee)
  salaries!: Salary[];

  @OneToMany(() => LeaveRequest, leaveRequest => leaveRequest.employee)
  leaveRequests!: LeaveRequest[];

  @OneToMany(() => TimeEntry, timeEntry => timeEntry.employee)
  timeEntries!: TimeEntry[];

  @OneToMany(() => EmployeeBenefit, employeeBenefit => employeeBenefit.employee)
  employeeBenefits!: EmployeeBenefit[];

  @OneToMany(() => PerformanceReview, performanceReview => performanceReview.employee)
  performanceReviews!: PerformanceReview[];
}
