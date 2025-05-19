import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from '../../core-hr/entities/employee.entity';

@Entity('user_consent')
export class UserConsent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ length: 50 })
  consentType: string;

  @Column({ type: 'timestamp' })
  consentDate: Date;
}
