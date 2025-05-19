import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../core-hr/entities/employee.entity';

@Entity('task_checklist')
export class TaskChecklist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ length: 255 })
  taskName: string;

  @Column({ length: 50 })
  status: string;
}
