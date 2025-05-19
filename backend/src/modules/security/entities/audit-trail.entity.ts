import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('audit_trail')
export class AuditTrail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  actionType: string;

  @Column({ type: 'int', nullable: true })
  actorId?: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
