import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from '../../core-hr/entities/employee.entity';

@Entity('goal')
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ length: 255 })
  goalTitle: string;

  @Column({ type: 'text', nullable: true })
  goalDescription?: string;

  @Column({ type: 'int', default: 0 })
  progressPercent: number;
}
