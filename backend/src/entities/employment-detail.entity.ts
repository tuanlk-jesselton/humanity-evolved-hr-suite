
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './employee.entity';

export enum EmploymentType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  INTERN = 'intern',
  TEMPORARY = 'temporary',
}

export enum EmploymentStatus {
  ACTIVE = 'active',
  PROBATION = 'probation',
  LEAVE = 'leave',
  TERMINATED = 'terminated',
}

@Entity('employment_details')
export class EmploymentDetail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  employee_id!: number;

  @ManyToOne(() => Employee, employee => employee.employmentDetails)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;

  @Column({ type: 'date' })
  hire_date!: Date;

  @Column({ type: 'date', nullable: true })
  end_date?: Date;

  @Column({
    type: 'enum',
    enum: EmploymentType,
    default: EmploymentType.FULL_TIME,
  })
  employment_type!: EmploymentType;

  @Column({
    type: 'enum',
    enum: EmploymentStatus,
    default: EmploymentStatus.ACTIVE,
  })
  status!: EmploymentStatus;

  @Column({ nullable: true })
  contract_file?: string;

  @Column({ nullable: true })
  notes?: string;

  @Column({ default: true })
  is_current!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
