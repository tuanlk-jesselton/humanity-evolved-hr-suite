import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayItemType } from '../entities/pay-item-type.entity';
import { CreatePayItemTypeDto } from '../dtos/create-pay-item-type.dto';

@Injectable()
export class PayItemTypeService {
  constructor(
    @InjectRepository(PayItemType)
    private payItemTypeRepository: Repository<PayItemType>,
  ) {}

  async create(dto: CreatePayItemTypeDto): Promise<PayItemType> {
    const entity = this.payItemTypeRepository.create(dto);
    return this.payItemTypeRepository.save(entity);
  }

  async findAll(): Promise<PayItemType[]> {
    return this.payItemTypeRepository.find();
  }

  async findOne(id: number): Promise<PayItemType> {
    return this.payItemTypeRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreatePayItemTypeDto>): Promise<PayItemType> {
    await this.payItemTypeRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.payItemTypeRepository.delete(id);
  }
}
