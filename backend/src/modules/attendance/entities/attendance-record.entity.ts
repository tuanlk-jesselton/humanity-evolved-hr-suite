import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../core-hr/entities/employee.entity';

@Entity('attendance_record')
export class AttendanceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'timestamp' })
  clockInTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  clockOutTime?: Date;

  @Column({ length: 255, nullable: true })
  location?: string;
}
