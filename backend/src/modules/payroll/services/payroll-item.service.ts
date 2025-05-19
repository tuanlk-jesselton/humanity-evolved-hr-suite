import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayrollItem } from '../entities/payroll-item.entity';
import { CreatePayrollItemDto } from '../dtos/create-payroll-item.dto';

@Injectable()
export class PayrollItemService {
  constructor(
    @InjectRepository(PayrollItem)
    private payrollItemRepository: Repository<PayrollItem>,
  ) {}

  async create(dto: CreatePayrollItemDto): Promise<PayrollItem> {
    const entity = this.payrollItemRepository.create(dto);
    return this.payrollItemRepository.save(entity);
  }

  async findAll(): Promise<PayrollItem[]> {
    return this.payrollItemRepository.find();
  }

  async findOne(id: number): Promise<PayrollItem> {
    return this.payrollItemRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreatePayrollItemDto>): Promise<PayrollItem> {
    await this.payrollItemRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.payrollItemRepository.delete(id);
  }
}
