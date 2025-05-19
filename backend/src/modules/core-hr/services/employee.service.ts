import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations: ['department', 'documents', 'customFieldValues'],
    });
  }

  async findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { id },
      relations: ['department', 'documents', 'customFieldValues'],
    });
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { password, ...rest } = createEmployeeDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = this.employeeRepository.create({
      ...rest,
      password: hashedPassword,
    } as any);
    const saved = await this.employeeRepository.save(employee);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async update(
    id: number,
    updateEmployeeDto: Partial<CreateEmployeeDto>,
  ): Promise<Employee> {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
