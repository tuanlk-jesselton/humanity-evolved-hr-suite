/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayrollRun } from '../entities/payroll-run.entity';
import { CreatePayrollRunDto } from '../dtos/create-payroll-run.dto';

@Injectable()
export class PayrollRunService {
  constructor(
    @InjectRepository(PayrollRun)
    private payrollRunRepository: Repository<PayrollRun>,
  ) {}

  async create(dto: CreatePayrollRunDto): Promise<PayrollRun> {
    const payrollRun = this.payrollRunRepository.create({
      ...dto,
      createdBy: dto.createdBy ? { id: Number(dto.createdBy) } : undefined,
      month: dto.month,
      year: dto.year,
      status: dto.status || 'draft',
    });
    const saved = await this.payrollRunRepository.save(payrollRun);
    return saved;
  }

  async findAll(): Promise<PayrollRun[]> {
    return this.payrollRunRepository.find();
  }

  async findOne(id: number): Promise<PayrollRun> {
    return this.payrollRunRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreatePayrollRunDto>): Promise<PayrollRun> {
    await this.payrollRunRepository.update(id, {
      ...dto,
      createdBy: dto.createdBy ? { id: Number(dto.createdBy) } : undefined,
      month: dto.month,
      year: dto.year,
      status: dto.status,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.payrollRunRepository.delete(id);
  }
}
