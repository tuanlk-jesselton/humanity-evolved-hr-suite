
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { User } from '../auth/entities/user.entity';

export enum DocumentType {
  ID = 'id',
  RESUME = 'resume',
  CONTRACT = 'contract',
  CERTIFICATE = 'certificate',
  TAX = 'tax',
  OTHER = 'other',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  employee_id!: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: DocumentType,
    default: DocumentType.OTHER,
  })
  type!: DocumentType;

  @Column()
  file_url!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  file_type?: string;

  @Column({ type: 'date', nullable: true })
  expiry_date?: Date;

  @Column({ default: false })
  is_verified!: boolean;

  @Column({ nullable: true })
  verified_by?: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'verified_by' })
  verifier?: User;

  @Column({ nullable: true, type: 'timestamp' })
  verified_at?: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
