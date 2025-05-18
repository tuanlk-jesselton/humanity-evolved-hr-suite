import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  role_id!: number;

  @ManyToOne(() => Role, role => role.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role!: Role;
}
