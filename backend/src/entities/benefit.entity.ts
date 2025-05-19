
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Company } from './company.entity';
import { EmployeeBenefit } from './employee-benefit.entity';

export enum BenefitType {
  HEALTH = 'health',
  DENTAL = 'dental',
  VISION = 'vision',
  RETIREMENT = 'retirement',
  LIFE_INSURANCE = 'life_insurance',
  OTHER = 'other',
}

@Entity('benefits')
export class Benefit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @ManyToOne(() => Company, company => company.benefits)
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: BenefitType,
    default: BenefitType.OTHER,
  })
  type!: BenefitType;

  @Column({ nullable: true })
  provider?: string;

  @Column({ nullable: true })
  policy_number?: string;

  @Column({ default: true })
  active!: boolean;

  @Column({ type: 'date', nullable: true })
  effective_date?: Date;

  @Column({ type: 'date', nullable: true })
  end_date?: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => EmployeeBenefit, employeeBenefit => employeeBenefit.benefit)
  employeeBenefits!: EmployeeBenefit[];
}
