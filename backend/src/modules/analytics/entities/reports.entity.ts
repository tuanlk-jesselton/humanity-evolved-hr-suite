import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reports')
export class Reports {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  reportType: string;

  @Column({ type: 'jsonb' })
  dataJson: object;
}
