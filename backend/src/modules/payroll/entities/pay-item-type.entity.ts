import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pay_item_type')
export class PayItemType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ default: false })
  isAllowance: boolean;
}
