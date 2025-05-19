/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Department } from './department.entity';
import { EmployeeDocument } from './employee-document.entity';
import { EmployeeCustomFieldValue } from './employee-custom-field-value.entity';

@Entity('employee')
export class Employee {
  @Column({ type: 'enum', enum: ['admin', 'manager', 'employee'], default: 'employee' })
  role: 'admin' | 'manager' | 'employee';
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'phone', length: 20, nullable: true })
  phone?: string;

  @Column({ name: 'join_date', type: 'date', nullable: true })
  joinDate?: Date;

  @Column({ name: 'exit_date', type: 'date', nullable: true })
  exitDate?: Date;

  @Column({ length: 100, nullable: true })
  position?: string;

  @Column({ name: 'status', length: 50, nullable: true })
  status?: string;

  @ManyToOne(() => Department, department => department.employees, { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department?: Department;

  @OneToMany(() => EmployeeDocument, document => document.employee)
  documents?: EmployeeDocument[];

  @OneToMany(() => EmployeeCustomFieldValue, customFieldValue => customFieldValue.employee)
  customFieldValues?: EmployeeCustomFieldValue[];

  @Column({ name: 'created_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
