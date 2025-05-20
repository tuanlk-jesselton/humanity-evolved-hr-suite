
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { Department } from '../entities/department.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);

  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  async findAll(name?: string): Promise<Company[]> {
    const query = this.companiesRepository.createQueryBuilder('company');

    if (name) {
      query.where('company.name ILIKE :name', { name: `%${name}%` });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companiesRepository.findOne({
      where: { id },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companiesRepository.create(createCompanyDto);
    return this.companiesRepository.save(company);
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id);
    
    const updatedCompany = Object.assign(company, updateCompanyDto);
    return this.companiesRepository.save(updatedCompany);
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id);
    await this.companiesRepository.remove(company);
  }

  async getDepartments(companyId: number): Promise<Department[]> {
    await this.findOne(companyId); // Verify company exists
    
    return this.departmentsRepository.find({
      where: { company_id: companyId },
      relations: ['head', 'parent'],
    });
  }
}
