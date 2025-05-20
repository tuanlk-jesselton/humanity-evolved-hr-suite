
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Company } from './company.entity';
import { Employee } from './employee.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @ManyToOne(() => Company, company => company.departments)
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  head_id?: number;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'head_id' })
  head?: Employee;

  @Column({ nullable: true })
  parent_id?: number;

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent?: Department;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Employee, employee => employee.department)
  employees!: Employee[];

  @OneToMany(() => Department, department => department.parent)
  children!: Department[];
}
