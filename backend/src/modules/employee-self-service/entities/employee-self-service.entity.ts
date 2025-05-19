import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../core-hr/entities/employee.entity';

@Entity('employee_self_service')
export class EmployeeSelfService {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'text', nullable: true })
  personalNote: string;

  @Column({ type: 'boolean', default: false })
  hasCompletedOnboarding: boolean;
}
