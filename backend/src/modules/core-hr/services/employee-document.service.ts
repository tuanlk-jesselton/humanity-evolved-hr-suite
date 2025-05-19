import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeDocument } from '../entities/employee-document.entity';
import { CreateEmployeeDocumentDto } from '../dtos/create-employee-document.dto';

@Injectable()
export class EmployeeDocumentService {
  constructor(
    @InjectRepository(EmployeeDocument)
    private employeeDocumentRepository: Repository<EmployeeDocument>,
  ) {}

  async findAll(): Promise<EmployeeDocument[]> {
    return this.employeeDocumentRepository.find({ relations: ['employee'] });
  }

  async findOne(id: string): Promise<EmployeeDocument> {
    return this.employeeDocumentRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
  }

  async create(
    createEmployeeDocumentDto: CreateEmployeeDocumentDto,
  ): Promise<EmployeeDocument> {
    const document = this.employeeDocumentRepository.create(
      createEmployeeDocumentDto,
    );
    return this.employeeDocumentRepository.save(document);
  }

  async update(
    id: string,
    updateDto: Partial<CreateEmployeeDocumentDto>,
  ): Promise<EmployeeDocument> {
    await this.employeeDocumentRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.employeeDocumentRepository.delete(id);
  }
}
