import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('local_rules')
export class LocalRules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  countryCode: string;

  @Column({ length: 100 })
  ruleName: string;

  @Column({ type: 'text' })
  ruleDescription: string;
}
