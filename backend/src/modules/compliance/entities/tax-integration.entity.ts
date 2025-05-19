import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tax_integration')
export class TaxIntegration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  countryCode: string;

  @Column({ length: 100 })
  providerName: string;

  @Column({ type: 'jsonb' })
  apiCredentialsJson: object;
}
