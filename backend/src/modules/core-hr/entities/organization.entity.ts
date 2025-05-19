import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('organization')
export class Organization {
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column()
  name: string;

  @Column({ name: 'tax_code', nullable: true })
  taxCode?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  logo?: string;

  @Column({ nullable: true })
  address?: string;
}
