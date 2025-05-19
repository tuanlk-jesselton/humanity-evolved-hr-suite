import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../core-hr/entities/employee.entity';

@Entity('performance_review')
export class PerformanceReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ nullable: true })
  reviewer_id?: number;

  @Column({ type: 'text', nullable: true })
  review_text?: string;

  @Column({ type: 'int', nullable: true })
  rating?: number;
}
