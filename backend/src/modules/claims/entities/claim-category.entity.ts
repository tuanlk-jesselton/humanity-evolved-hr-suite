import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('claim_category')
export class ClaimCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;
}
