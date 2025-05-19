
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Company } from './company.entity';
import { LeaveRequest } from './leave-request.entity';

@Entity('leave_types')
export class LeaveType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @ManyToOne(() => Company, company => company.leaveTypes)
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  default_days!: number;

  @Column({ default: true })
  paid!: boolean;

  @Column({ default: true })
  active!: boolean;

  @Column({ nullable: true })
  color?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => LeaveRequest, leaveRequest => leaveRequest.leaveType)
  leaveRequests!: LeaveRequest[];
}
