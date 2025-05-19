import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('integration_settings')
export class IntegrationSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  integrationName: string;

  @Column({ type: 'jsonb' })
  settingsJson: object;
}
