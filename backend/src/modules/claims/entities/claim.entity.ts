import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from '../../core-hr/entities/employee.entity';
import { ClaimCategory } from './claim-category.entity';

@Entity('claim')
export class Claim {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => ClaimCategory)
  @JoinColumn({ name: 'claim_category_id' })
  claimCategory: ClaimCategory;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column({ length: 50 })
  status: string;

  @Column({ nullable: true })
  approvedBy?: number;
}
