import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('country_settings')
export class CountrySettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  countryCode: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  timezone: string;
}
