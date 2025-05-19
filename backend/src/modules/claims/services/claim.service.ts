import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Claim } from '../entities/claim.entity';
import { CreateClaimDto } from '../dtos/create-claim.dto';

@Injectable()
export class ClaimService {
  constructor(
    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
  ) {}

  async create(dto: CreateClaimDto): Promise<Claim> {
    const entity = this.claimRepository.create(dto);
    return this.claimRepository.save(entity);
  }

  async findAll(): Promise<Claim[]> {
    return this.claimRepository.find();
  }

  async findOne(id: number): Promise<Claim> {
    return this.claimRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateClaimDto>): Promise<Claim> {
    await this.claimRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.claimRepository.delete(id);
  }
}
