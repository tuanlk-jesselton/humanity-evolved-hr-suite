
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Candidate } from './candidate.entity';
import { User } from '../auth/entities/user.entity';

export enum InterviewStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

@Entity('interviews')
export class Interview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  candidate_id!: number;

  @ManyToOne(() => Candidate, candidate => candidate.interviews)
  @JoinColumn({ name: 'candidate_id' })
  candidate!: Candidate;

  @Column()
  interviewer_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'interviewer_id' })
  interviewer!: User;

  @Column({ type: 'timestamp' })
  scheduled_at!: Date;

  @Column({ nullable: true })
  duration_minutes?: number;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  meeting_link?: string;

  @Column({
    type: 'enum',
    enum: InterviewStatus,
    default: InterviewStatus.SCHEDULED,
  })
  status!: InterviewStatus;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true, type: 'json' })
  feedback?: Record<string, any>;

  @Column({ nullable: true })
  rating?: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
