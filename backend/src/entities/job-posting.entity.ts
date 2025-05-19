
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Company } from './company.entity';
import { Department } from './department.entity';
import { Candidate } from './candidate.entity';

export enum JobStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  CLOSED = 'closed',
  ON_HOLD = 'on_hold',
}

@Entity('job_postings')
export class JobPosting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @ManyToOne(() => Company, company => company.jobPostings)
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @Column({ nullable: true })
  department_id?: number;

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department?: Department;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  requirements?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.DRAFT,
  })
  status!: JobStatus;

  @Column({ type: 'date', nullable: true })
  opening_date?: Date;

  @Column({ type: 'date', nullable: true })
  closing_date?: Date;

  @Column({ nullable: true })
  salary_range?: string;

  @Column({ nullable: true })
  employment_type?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Candidate, candidate => candidate.jobPosting)
  candidates!: Candidate[];
}
