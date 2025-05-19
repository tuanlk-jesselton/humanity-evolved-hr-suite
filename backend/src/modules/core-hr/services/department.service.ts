import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { CreateDepartmentDto } from '../dtos/create-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find({
      relations: ['parentDepartment', 'subDepartments', 'employees'],
    });
  }

  async findOne(id: string): Promise<Department> {
    return this.departmentRepository.findOne({
      where: { id: id },
      relations: ['parentDepartment', 'subDepartments', 'employees'],
    });
  }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(department);
  }

  async update(
    id: string,
    updateDepartmentDto: Partial<CreateDepartmentDto>,
  ): Promise<Department> {
    await this.departmentRepository.update(id, updateDepartmentDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.departmentRepository.delete(id);
  }
}
