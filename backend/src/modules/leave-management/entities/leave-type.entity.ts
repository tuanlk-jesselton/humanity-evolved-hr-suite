import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('leave_type')
export class LeaveType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, nullable: true })
  accrualPolicy?: string;

  @Column({ type: 'int', nullable: true })
  maxDays?: number;
}
