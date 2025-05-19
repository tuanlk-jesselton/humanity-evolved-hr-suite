import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from './employee.entity';
import { CustomField } from './custom-field.entity';

@Entity('employee_custom_field_value')
export class EmployeeCustomFieldValue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.customFieldValues)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => CustomField, (customField) => customField.customFieldValues)
  @JoinColumn({ name: 'custom_field_id' })
  customField: CustomField;

  @Column({ type: 'text', nullable: true })
  value?: string;

  @Column({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
