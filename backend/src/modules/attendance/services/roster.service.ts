import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roster } from '../entities/roster.entity';
import { CreateRosterDto } from '../dtos/create-roster.dto';

@Injectable()
export class RosterService {
  constructor(
    @InjectRepository(Roster)
    private rosterRepository: Repository<Roster>,
  ) {}

  async create(dto: CreateRosterDto): Promise<Roster> {
    const entity = this.rosterRepository.create(dto);
    return this.rosterRepository.save(entity);
  }

  async findAll(): Promise<Roster[]> {
    return this.rosterRepository.find();
  }

  async findOne(id: number): Promise<Roster> {
    return this.rosterRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: Partial<CreateRosterDto>): Promise<Roster> {
    await this.rosterRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.rosterRepository.delete(id);
  }
}
