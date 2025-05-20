import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tenants')
export class Tenant {
  @ApiProperty({ example: 1, description: 'The unique identifier of the tenant' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Acme Corp', description: 'The name of the tenant' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 'acme@example.com', description: 'Contact email for the tenant' })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({ example: '2023-01-01T00:00:00Z', description: 'Tenant creation date' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00Z', description: 'Tenant last update date' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
