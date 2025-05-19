import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../core-hr/entities/employee.entity';

@Entity('roster')
export class Roster {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'timestamp' })
  shiftStart: Date;

  @Column({ type: 'timestamp' })
  shiftEnd: Date;

  @Column({ length: 100 })
  shiftName: string;
}
