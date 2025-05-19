import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from '../../core-hr/entities/employee.entity';

@Entity('contribution_record')
export class ContributionRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ length: 50 })
  contributionType: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column()
  month: string;
}
