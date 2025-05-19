
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { JobPosting } from './job-posting.entity';
import { Interview } from './interview.entity';

export enum CandidateStatus {
  NEW = 'new',
  SCREENING = 'screening',
  INTERVIEW = 'interview',
  OFFER = 'offer',
  HIRED = 'hired',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  job_posting_id!: number;

  @ManyToOne(() => JobPosting, jobPosting => jobPosting.candidates)
  @JoinColumn({ name: 'job_posting_id' })
  jobPosting!: JobPosting;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  resume_url?: string;

  @Column({ nullable: true })
  cover_letter_url?: string;

  @Column({
    type: 'enum',
    enum: CandidateStatus,
    default: CandidateStatus.NEW,
  })
  status!: CandidateStatus;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true, type: 'json' })
  skills?: string[];

  @Column({ nullable: true })
  source?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Interview, interview => interview.candidate)
  interviews!: Interview[];
}
