import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../core-hr/entities/employee.entity';

@Entity('manager_self_service')
export class ManagerSelfService {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'manager_id' })
  manager: Employee;

  @Column({ type: 'text', nullable: true })
  managerNote: string;

  @Column({ type: 'boolean', default: false })
  hasCompletedManagerTraining: boolean;
}
