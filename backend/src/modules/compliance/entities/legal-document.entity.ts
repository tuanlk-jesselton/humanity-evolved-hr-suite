import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('legal_document')
export class LegalDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ length: 10 })
  countryCode: string;
}
