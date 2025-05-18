import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ unique: true, nullable: true })
  password_hash?: string;

  @Column({ nullable: true })
  full_name?: string;

  @Column({ nullable: true })
  company_id?: number;

  @Column({ default: true })
  is_active!: boolean;
}
