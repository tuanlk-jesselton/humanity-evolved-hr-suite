
import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { PayrollCycle } from '../entities/payroll-cycle.entity';
import { PayrollRun, PayrollRunStatus } from '../entities/payroll-run.entity';
import { PayslipItem, PayslipItemType } from '../entities/payslip-item.entity';
import { Employee } from '../entities/employee.entity';
import { Salary } from '../entities/salary.entity';
import {
  CreatePayrollCycleDto,
  UpdatePayrollCycleDto,
  CreatePayrollRunDto,
  UpdatePayrollRunDto,
  GeneratePayslipsDto,
} from './dto';

@Injectable()
export class PayrollService {
  private readonly logger = new Logger(PayrollService.name);

  constructor(
    @InjectRepository(PayrollCycle)
    private payrollCyclesRepository: Repository<PayrollCycle>,
    @InjectRepository(PayrollRun)
    private payrollRunsRepository: Repository<PayrollRun>,
    @InjectRepository(PayslipItem)
    private payslipItemsRepository: Repository<PayslipItem>,
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    @InjectRepository(Salary)
    private salariesRepository: Repository<Salary>,
  ) {}

  // Payroll Cycles
  async findAllCycles(companyId?: number): Promise<PayrollCycle[]> {
    const query = this.payrollCyclesRepository.createQueryBuilder('cycle')
      .leftJoinAndSelect('cycle.company', 'company');

    if (companyId) {
      query.where('cycle.company_id = :companyId', { companyId });
    }

    return query.orderBy('cycle.name', 'ASC').getMany();
  }

  async findOneCycle(id: number): Promise<PayrollCycle> {
    const cycle = await this.payrollCyclesRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!cycle) {
      throw new NotFoundException(`Payroll cycle with ID ${id} not found`);
    }

    return cycle;
  }

  async createCycle(createPayrollCycleDto: CreatePayrollCycleDto): Promise<PayrollCycle> {
    const cycle = this.payrollCyclesRepository.create(createPayrollCycleDto);
    return this.payrollCyclesRepository.save(cycle);
  }

  async updateCycle(id: number, updatePayrollCycleDto: UpdatePayrollCycleDto): Promise<PayrollCycle> {
    const cycle = await this.findOneCycle(id);
    
    const updatedCycle = Object.assign(cycle, updatePayrollCycleDto);
    return this.payrollCyclesRepository.save(updatedCycle);
  }

  async removeCycle(id: number): Promise<void> {
    const cycle = await this.findOneCycle(id);
    
    // Check if there are any runs associated with this cycle
    const runsCount = await this.payrollRunsRepository.count({
      where: { payroll_cycle_id: id },
    });
    
    if (runsCount > 0) {
      throw new BadRequestException(`Cannot delete payroll cycle with ID ${id} as it has associated payroll runs`);
    }
    
    await this.payrollCyclesRepository.remove(cycle);
  }

  // Payroll Runs
  async findAllRuns(cycleId?: number, status?: string): Promise<PayrollRun[]> {
    const query = this.payrollRunsRepository.createQueryBuilder('run')
      .leftJoinAndSelect('run.payrollCycle', 'cycle')
      .leftJoinAndSelect('run.creator', 'creator')
      .leftJoinAndSelect('run.approver', 'approver');

    if (cycleId) {
      query.andWhere('run.payroll_cycle_id = :cycleId', { cycleId });
    }

    if (status) {
      query.andWhere('run.status = :status', { status });
    }

    return query.orderBy('run.payment_date', 'DESC').getMany();
  }

  async findOneRun(id: number): Promise<PayrollRun> {
    const run = await this.payrollRunsRepository.findOne({
      where: { id },
      relations: ['payrollCycle', 'creator', 'approver'],
    });

    if (!run) {
      throw new NotFoundException(`Payroll run with ID ${id} not found`);
    }

    return run;
  }

  async createRun(createPayrollRunDto: CreatePayrollRunDto): Promise<PayrollRun> {
    // Verify payroll cycle exists
    await this.findOneCycle(createPayrollRunDto.payroll_cycle_id);
    
    const run = this.payrollRunsRepository.create(createPayrollRunDto);
    return this.payrollRunsRepository.save(run);
  }

  async updateRun(id: number, updatePayrollRunDto: UpdatePayrollRunDto): Promise<PayrollRun> {
    const run = await this.findOneRun(id);
    
    if (run.status === PayrollRunStatus.COMPLETED || run.locked) {
      throw new BadRequestException(`Cannot update a completed or locked payroll run`);
    }
    
    const updatedRun = Object.assign(run, updatePayrollRunDto);
    
    if (updatePayrollRunDto.status === PayrollRunStatus.APPROVED && !updatePayrollRunDto.approved_by) {
      throw new BadRequestException(`Approver ID is required when setting status to APPROVED`);
    }
    
    if (updatePayrollRunDto.status === PayrollRunStatus.APPROVED) {
      updatedRun.approved_at = new Date();
    }
    
    return this.payrollRunsRepository.save(updatedRun);
  }

  async removeRun(id: number): Promise<void> {
    const run = await this.findOneRun(id);
    
    if (run.status === PayrollRunStatus.COMPLETED || run.locked) {
      throw new BadRequestException(`Cannot delete a completed or locked payroll run`);
    }
    
    await this.payrollRunsRepository.remove(run);
  }

  // Payslips
  async generatePayslips(id: number, generatePayslipsDto: GeneratePayslipsDto): Promise<PayslipItem[]> {
    const run = await this.findOneRun(id);
    
    if (run.status === PayrollRunStatus.COMPLETED || run.locked) {
      throw new BadRequestException(`Cannot generate payslips for a completed or locked payroll run`);
    }
    
    // Get employees to generate payslips for (either specific employees or all)
    let employees: Employee[];
    if (generatePayslipsDto.employee_ids && generatePayslipsDto.employee_ids.length > 0) {
      employees = await this.employeesRepository.findByIds(generatePayslipsDto.employee_ids);
      if (employees.length !== generatePayslipsDto.employee_ids.length) {
        throw new BadRequestException('Some employee IDs are invalid');
      }
    } else {
      // Get all active employees from the company
      const companyId = (await this.findOneCycle(run.payroll_cycle_id)).company_id;
      employees = await this.employeesRepository.createQueryBuilder('employee')
        .innerJoin('employee.user', 'user')
        .where('user.company_id = :companyId', { companyId })
        .andWhere('user.is_active = TRUE')
        .getMany();
    }
    
    // Delete existing payslip items for these employees if any
    if (employees.length > 0) {
      await this.payslipItemsRepository.delete({
        payroll_run_id: id,
        employee_id: generatePayslipsDto.regenerate ? In([employees.map(e => e.id)]) : undefined,
      });
    }
    
    // Generate payslip items for each employee
    const payslipItems: PayslipItem[] = [];
    
    for (const employee of employees) {
      // Get current salary
      const currentSalary = await this.salariesRepository.findOne({
        where: {
          employee_id: employee.id,
          is_current: true,
        },
      });
      
      if (!currentSalary) {
        this.logger.warn(`No current salary found for employee ID ${employee.id}, skipping`);
        continue;
      }
      
      // Calculate base salary for the period
      let baseSalary = currentSalary.amount;
      
      // Create base salary item
      const baseSalaryItem = this.payslipItemsRepository.create({
        payroll_run_id: id,
        employee_id: employee.id,
        name: 'Base Salary',
        type: PayslipItemType.EARNING,
        amount: baseSalary,
      });
      
      await this.payslipItemsRepository.save(baseSalaryItem);
      payslipItems.push(baseSalaryItem);
      
      // TODO: Add more payslip items like allowances, deductions, taxes, etc.
      // This would typically involve more complex calculations based on
      // the employee's benefits, tax bracket, etc.
    }
    
    // Update payroll run totals
    const items = await this.getRunPayslips(id);
    const totalGross = items.reduce((sum, item) => {
      if (item.type === PayslipItemType.EARNING) {
        return sum + Number(item.amount);
      }
      return sum;
    }, 0);
    
    const totalDeductions = items.reduce((sum, item) => {
      if (item.type === PayslipItemType.DEDUCTION || item.type === PayslipItemType.TAX) {
        return sum + Number(item.amount);
      }
      return sum;
    }, 0);
    
    const totalNet = totalGross - totalDeductions;
    
    await this.payrollRunsRepository.update(id, {
      total_gross: totalGross,
      total_deductions: totalDeductions,
      total_net: totalNet,
    });
    
    return payslipItems;
  }

  async getRunPayslips(runId: number): Promise<PayslipItem[]> {
    await this.findOneRun(runId); // Verify run exists
    
    return this.payslipItemsRepository.find({
      where: { payroll_run_id: runId },
      relations: ['employee', 'employee.user'],
      order: { employee_id: 'ASC', type: 'ASC' },
    });
  }

  async getEmployeePayslips(employeeId: number): Promise<PayslipItem[]> {
    // Verify employee exists
    const employee = await this.employeesRepository.findOne({
      where: { id: employeeId },
    });
    
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }
    
    return this.payslipItemsRepository.find({
      where: { employee_id: employeeId },
      relations: ['payrollRun'],
      order: { created_at: 'DESC' },
    });
  }
}
