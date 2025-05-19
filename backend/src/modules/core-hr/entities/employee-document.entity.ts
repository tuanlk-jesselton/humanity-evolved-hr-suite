import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('employee_document')
export class EmployeeDocument {
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @ManyToOne(() => Employee, (employee) => employee.documents)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'document_type', length: 100, nullable: true })
  documentType?: string;

  @Column({ name: 'document_name', type: 'text', nullable: true })
  documentName?: string;

  @Column({ name: 'file_path', type: 'text', nullable: true })
  filePath?: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({
    name: 'uploaded_at',
    type: 'timestamp with time zone',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  uploadedAt?: Date;
}
