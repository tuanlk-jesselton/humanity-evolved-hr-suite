import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PayrollRun } from './payroll-run.entity';

@Entity('bank_transfer_batch')
export class BankTransferBatch {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PayrollRun)
  @JoinColumn({ name: 'payroll_run_id' })
  payrollRun: PayrollRun;

  @Column({ length: 255 })
  fileUrl: string;
}
