import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LegalDocument } from '../entities/legal-document.entity';
import { CreateLegalDocumentDto } from '../dtos/create-legal-document.dto';

@Injectable()
export class LegalDocumentService {
  constructor(
    @InjectRepository(LegalDocument)
    private legalDocumentRepository: Repository<LegalDocument>,
  ) {}

  async create(dto: CreateLegalDocumentDto): Promise<LegalDocument> {
    const entity = this.legalDocumentRepository.create(dto);
    return this.legalDocumentRepository.save(entity);
  }

  async findAll(): Promise<LegalDocument[]> {
    return this.legalDocumentRepository.find();
  }

  async findOne(id: number): Promise<LegalDocument> {
    return this.legalDocumentRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateLegalDocumentDto>): Promise<LegalDocument> {
    await this.legalDocumentRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.legalDocumentRepository.delete(id);
  }
}
