import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserConsent } from '../entities/user-consent.entity';
import { CreateUserConsentDto } from '../dtos/create-user-consent.dto';

@Injectable()
export class UserConsentService {
  constructor(
    @InjectRepository(UserConsent)
    private userConsentRepository: Repository<UserConsent>,
  ) {}

  async create(dto: CreateUserConsentDto): Promise<UserConsent> {
    const entity = this.userConsentRepository.create(dto);
    return this.userConsentRepository.save(entity);
  }

  async findAll(): Promise<UserConsent[]> {
    return this.userConsentRepository.find();
  }

  async findOne(id: number): Promise<UserConsent> {
    return this.userConsentRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateUserConsentDto>): Promise<UserConsent> {
    await this.userConsentRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userConsentRepository.delete(id);
  }
}
