import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditTrail } from '../entities/audit-trail.entity';
import { CreateAuditTrailDto } from '../dtos/create-audit-trail.dto';

@Injectable()
export class AuditTrailService {
  constructor(
    @InjectRepository(AuditTrail)
    private auditTrailRepository: Repository<AuditTrail>,
  ) {}

  async create(dto: CreateAuditTrailDto): Promise<AuditTrail> {
    const entity = this.auditTrailRepository.create(dto);
    return this.auditTrailRepository.save(entity);
  }

  async findAll(): Promise<AuditTrail[]> {
    return this.auditTrailRepository.find();
  }

  async findOne(id: number): Promise<AuditTrail> {
    return this.auditTrailRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateAuditTrailDto>): Promise<AuditTrail> {
    await this.auditTrailRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.auditTrailRepository.delete(id);
  }
}
