
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from '../../entities/company.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  password_hash?: string;

  @Column({ nullable: true })
  full_name?: string;

  @Column({ nullable: true })
  company_id?: number;

  @ManyToOne(() => Company, company => company.users, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column({ default: true })
  is_active!: boolean;
}
