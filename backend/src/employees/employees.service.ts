
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { User } from '../auth/entities/user.entity';
import { Department } from '../entities/department.entity';
import { EmploymentDetail, EmploymentType, EmploymentStatus } from '../entities/employment-detail.entity';
import { Salary } from '../entities/salary.entity';
import { Document } from '../entities/document.entity';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger(EmployeesService.name);

  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
    @InjectRepository(EmploymentDetail)
    private employmentDetailsRepository: Repository<EmploymentDetail>,
    @InjectRepository(Salary)
    private salariesRepository: Repository<Salary>,
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  async findAll(companyId?: number, departmentId?: number, managerId?: number): Promise<Employee[]> {
    const query = this.employeesRepository.createQueryBuilder('employee')
      .leftJoinAndSelect('employee.user', 'user')
      .leftJoinAndSelect('employee.department', 'department')
      .leftJoinAndSelect('employee.manager', 'manager')
      .leftJoinAndSelect('manager.user', 'managerUser');

    if (companyId) {
      query.andWhere('user.company_id = :companyId', { companyId });
    }

    if (departmentId) {
      query.andWhere('employee.department_id = :departmentId', { departmentId });
    }

    if (managerId) {
      query.andWhere('employee.manager_id = :managerId', { managerId });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeesRepository.findOne({
      where: { id },
      relations: ['user', 'department', 'manager', 'manager.user'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async findByUserId(userId: number): Promise<Employee | null> {
    return this.employeesRepository.findOne({
      where: { user_id: userId },
      relations: ['user', 'department'],
    });
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    // Check if user exists
    const user = await this.usersRepository.findOne({
      where: { id: createEmployeeDto.user_id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${createEmployeeDto.user_id} not found`);
    }

    // Check if department exists if provided
    if (createEmployeeDto.department_id) {
      const department = await this.departmentsRepository.findOne({
        where: { id: createEmployeeDto.department_id },
      });

      if (!department) {
        throw new NotFoundException(`Department with ID ${createEmployeeDto.department_id} not found`);
      }
    }

    // Check if manager exists if provided
    if (createEmployeeDto.manager_id) {
      const manager = await this.employeesRepository.findOne({
        where: { id: createEmployeeDto.manager_id },
      });

      if (!manager) {
        throw new NotFoundException(`Manager (Employee) with ID ${createEmployeeDto.manager_id} not found`);
      }
    }

    // Create employee record
    const { employmentDetails, salary, ...employeeDto } = createEmployeeDto;
    const employee = this.employeesRepository.create(employeeDto);
    const savedEmployee = await this.employeesRepository.save(employee);

    // Create employment details if provided
    if (employmentDetails) {
      const mappedEmploymentDetail: any = {
        employee_id: savedEmployee.id,
        hire_date: employmentDetails.start_date,
        end_date: employmentDetails.end_date,
        employment_type: employmentDetails.employment_type ? EmploymentType[employmentDetails.employment_type.toUpperCase()] : undefined,
        is_current: employmentDetails.is_current,
        status: employmentDetails.status ? EmploymentStatus[employmentDetails.status.toUpperCase()] : undefined,
        notes: employmentDetails.notes,
      };
      const employmentDetail = this.employmentDetailsRepository.create(mappedEmploymentDetail);
      await this.employmentDetailsRepository.save(employmentDetail);
    }

    // Create salary information if provided
    if (salary) {
      const salaryEntity = this.salariesRepository.create({
        ...salary,
        employee_id: savedEmployee.id,
      });
      await this.salariesRepository.save(salaryEntity);
    }

    return this.findOne(savedEmployee.id);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.findOne(id);

    // Check if department exists if provided
    if (updateEmployeeDto.department_id) {
      const department = await this.departmentsRepository.findOne({
        where: { id: updateEmployeeDto.department_id },
      });

      if (!department) {
        throw new NotFoundException(`Department with ID ${updateEmployeeDto.department_id} not found`);
      }
    }

    // Check if manager exists if provided
    if (updateEmployeeDto.manager_id) {
      const manager = await this.employeesRepository.findOne({
        where: { id: updateEmployeeDto.manager_id },
      });

      if (!manager) {
        throw new NotFoundException(`Manager (Employee) with ID ${updateEmployeeDto.manager_id} not found`);
      }
    }

    // Update employee record
    const updatedEmployee = Object.assign(employee, updateEmployeeDto);
    return this.employeesRepository.save(updatedEmployee);
  }

  async remove(id: number): Promise<void> {
    const employee = await this.findOne(id);
    await this.employeesRepository.remove(employee);
  }

  async getEmploymentDetails(employeeId: number): Promise<EmploymentDetail[]> {
    await this.findOne(employeeId); // Verify employee exists

    return this.employmentDetailsRepository.find({
      where: { employee_id: employeeId },
      order: { is_current: 'DESC' },
    });
  }

  async getSalaryInfo(employeeId: number): Promise<Salary[]> {
    await this.findOne(employeeId); // Verify employee exists

    return this.salariesRepository.find({
      where: { employee_id: employeeId },
      order: { is_current: 'DESC' },
    });
  }

  async getDocuments(employeeId: number): Promise<Document[]> {
    await this.findOne(employeeId); // Verify employee exists

    return this.documentsRepository.find({
      where: { employee_id: employeeId },
      order: { created_at: 'DESC' },
    });
  }
}
