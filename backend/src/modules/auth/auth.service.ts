import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../modules/core-hr/entities/employee.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async validateAdmin(
    email: string,
    password: string,
  ): Promise<Employee | null> {
    const employee = await this.employeeRepository.findOne({
      where: { email: email.toLowerCase(), role: 'admin' },
      select: ['id', 'email', 'role', 'password'], // add all fields you need
    });
    if (employee && (await bcrypt.compare(password, employee.password))) {
      return employee;
    }
    return null;
  }
}
