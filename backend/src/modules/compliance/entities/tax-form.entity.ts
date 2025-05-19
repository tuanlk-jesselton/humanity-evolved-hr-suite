import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from '../../core-hr/entities/employee.entity';

@Entity('tax_form')
export class TaxForm {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ length: 50 })
  formType: string;

  @Column({ length: 255 })
  fileUrl: string;

  @Column({ type: 'int' })
  year: number;
}
