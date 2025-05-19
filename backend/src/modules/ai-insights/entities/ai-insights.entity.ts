import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ai_insights')
export class AIInsights {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  insightType: string;

  @Column({ type: 'int', nullable: true })
  referenceId?: number;

  @Column({ type: 'text' })
  summary: string;
}
