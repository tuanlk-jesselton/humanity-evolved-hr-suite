import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from './employee.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('department')
export class Department {
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => Department, (department) => department.subDepartments, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_department_id' })
  parentDepartment?: Department;

  @OneToMany(() => Department, (department) => department.parentDepartment)
  subDepartments?: Department[];

  @OneToMany(() => Employee, (employee) => employee.department)
  employees?: Employee[];

  @Column({ name: 'manager_id', type: 'uuid', nullable: true })
  manager_id?: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organization_id: string;

  @Column({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
