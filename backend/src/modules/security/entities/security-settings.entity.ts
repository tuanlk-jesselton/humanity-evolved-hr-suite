import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('security_settings')
export class SecuritySettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  settingKey: string;

  @Column({ type: 'text' })
  settingValue: string;
}
