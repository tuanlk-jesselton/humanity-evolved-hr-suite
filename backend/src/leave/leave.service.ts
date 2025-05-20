
import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { LeaveType } from '../entities/leave-type.entity';
import { LeaveRequest, LeaveStatus } from '../entities/leave-request.entity';
import { Employee } from '../entities/employee.entity';
import {
  CreateLeaveTypeDto,
  UpdateLeaveTypeDto,
  CreateLeaveRequestDto,
  UpdateLeaveRequestDto,
  ApproveLeaveRequestDto,
} from './dto';
import { differenceInCalendarDays } from 'date-fns';

@Injectable()
export class LeaveService {
  private readonly logger = new Logger(LeaveService.name);

  constructor(
    @InjectRepository(LeaveType)
    private leaveTypesRepository: Repository<LeaveType>,
    @InjectRepository(LeaveRequest)
    private leaveRequestsRepository: Repository<LeaveRequest>,
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  // Leave Types
  async findAllTypes(companyId?: number): Promise<LeaveType[]> {
    const query = this.leaveTypesRepository.createQueryBuilder('leaveType')
      .leftJoinAndSelect('leaveType.company', 'company');

    if (companyId) {
      query.where('leaveType.company_id = :companyId', { companyId });
    }

    query.andWhere('leaveType.active = TRUE');

    return query.orderBy('leaveType.name', 'ASC').getMany();
  }

  async findOneType(id: number): Promise<LeaveType> {
    const leaveType = await this.leaveTypesRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!leaveType) {
      throw new NotFoundException(`Leave type with ID ${id} not found`);
    }

    return leaveType;
  }

  async createType(createLeaveTypeDto: CreateLeaveTypeDto): Promise<LeaveType> {
    const leaveType = this.leaveTypesRepository.create(createLeaveTypeDto);
    return this.leaveTypesRepository.save(leaveType);
  }

  async updateType(id: number, updateLeaveTypeDto: UpdateLeaveTypeDto): Promise<LeaveType> {
    const leaveType = await this.findOneType(id);
    
    const updatedLeaveType = Object.assign(leaveType, updateLeaveTypeDto);
    return this.leaveTypesRepository.save(updatedLeaveType);
  }

  async removeType(id: number): Promise<void> {
    const leaveType = await this.findOneType(id);
    
    // Check if there are any leave requests associated with this type
    const requestsCount = await this.leaveRequestsRepository.count({
      where: { leave_type_id: id },
    });
    
    if (requestsCount > 0) {
      // Instead of deleting, mark it as inactive
      leaveType.active = false;
      await this.leaveTypesRepository.save(leaveType);
    } else {
      await this.leaveTypesRepository.remove(leaveType);
    }
  }

  // Leave Requests
  async findAllRequests(employeeId?: number, status?: string): Promise<LeaveRequest[]> {
    const query = this.leaveRequestsRepository.createQueryBuilder('leaveRequest')
      .leftJoinAndSelect('leaveRequest.employee', 'employee')
      .leftJoinAndSelect('employee.user', 'user')
      .leftJoinAndSelect('leaveRequest.leaveType', 'leaveType')
      .leftJoinAndSelect('leaveRequest.approver', 'approver');

    if (employeeId) {
      query.andWhere('leaveRequest.employee_id = :employeeId', { employeeId });
    }

    if (status) {
      query.andWhere('leaveRequest.status = :status', { status });
    }

    return query.orderBy('leaveRequest.start_date', 'DESC').getMany();
  }

  async findOneRequest(id: number): Promise<LeaveRequest> {
    const leaveRequest = await this.leaveRequestsRepository.findOne({
      where: { id },
      relations: ['employee', 'employee.user', 'leaveType', 'approver'],
    });

    if (!leaveRequest) {
      throw new NotFoundException(`Leave request with ID ${id} not found`);
    }

    return leaveRequest;
  }

  async createRequest(createLeaveRequestDto: CreateLeaveRequestDto): Promise<LeaveRequest> {
    // Verify employee exists
    const employee = await this.employeesRepository.findOne({
      where: { id: createLeaveRequestDto.employee_id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${createLeaveRequestDto.employee_id} not found`);
    }

    // Verify leave type exists
    await this.findOneType(createLeaveRequestDto.leave_type_id);
    
    // Calculate days
    const startDate = new Date(createLeaveRequestDto.start_date);
    const endDate = new Date(createLeaveRequestDto.end_date);
    
    if (endDate < startDate) {
      throw new BadRequestException('End date cannot be before start date');
    }
    
    // Simple days calculation (excluding weekends would be more complex)
    const days = differenceInCalendarDays(endDate, startDate) + 1;
    
    // Check for overlapping leave requests
    const overlappingRequests = await this.leaveRequestsRepository.createQueryBuilder('leaveRequest')
      .where('leaveRequest.employee_id = :employeeId', { employeeId: createLeaveRequestDto.employee_id })
      .andWhere('leaveRequest.status != :cancelledStatus', { cancelledStatus: LeaveStatus.CANCELLED })
      .andWhere('leaveRequest.status != :rejectedStatus', { rejectedStatus: LeaveStatus.REJECTED })
      .andWhere(
        '(leaveRequest.start_date <= :endDate AND leaveRequest.end_date >= :startDate)',
        { startDate, endDate }
      )
      .getCount();
    
    if (overlappingRequests > 0) {
      throw new BadRequestException('There is an overlapping leave request for this period');
    }
    
    const leaveRequest = this.leaveRequestsRepository.create({
      ...createLeaveRequestDto,
      days,
    });
    
    return this.leaveRequestsRepository.save(leaveRequest);
  }

  async updateRequest(id: number, updateLeaveRequestDto: UpdateLeaveRequestDto): Promise<LeaveRequest> {
    const leaveRequest = await this.findOneRequest(id);
    
    if (leaveRequest.status !== LeaveStatus.PENDING) {
      throw new BadRequestException('Only pending leave requests can be updated');
    }
    
    // If dates are changed, recalculate days
    if (updateLeaveRequestDto.start_date || updateLeaveRequestDto.end_date) {
      const startDate = updateLeaveRequestDto.start_date 
        ? new Date(updateLeaveRequestDto.start_date) 
        : leaveRequest.start_date;
        
      const endDate = updateLeaveRequestDto.end_date 
        ? new Date(updateLeaveRequestDto.end_date) 
        : leaveRequest.end_date;
      
      if (endDate < startDate) {
        throw new BadRequestException('End date cannot be before start date');
      }
      
      // Recalculate days
      updateLeaveRequestDto.days = differenceInCalendarDays(endDate, startDate) + 1;
      
      // Check for overlapping leave requests
      const overlappingRequests = await this.leaveRequestsRepository.createQueryBuilder('leaveRequest')
        .where('leaveRequest.employee_id = :employeeId', { employeeId: leaveRequest.employee_id })
        .andWhere('leaveRequest.id != :id', { id })
        .andWhere('leaveRequest.status != :cancelledStatus', { cancelledStatus: LeaveStatus.CANCELLED })
        .andWhere('leaveRequest.status != :rejectedStatus', { rejectedStatus: LeaveStatus.REJECTED })
        .andWhere(
          '(leaveRequest.start_date <= :endDate AND leaveRequest.end_date >= :startDate)',
          { startDate, endDate }
        )
        .getCount();
      
      if (overlappingRequests > 0) {
        throw new BadRequestException('There is an overlapping leave request for this period');
      }
    }
    
    const updatedLeaveRequest = Object.assign(leaveRequest, updateLeaveRequestDto);
    return this.leaveRequestsRepository.save(updatedLeaveRequest);
  }

  async removeRequest(id: number): Promise<void> {
    const leaveRequest = await this.findOneRequest(id);
    
    if (leaveRequest.status !== LeaveStatus.PENDING) {
      throw new BadRequestException('Only pending leave requests can be deleted');
    }
    
    await this.leaveRequestsRepository.remove(leaveRequest);
  }

  async approveRequest(id: number, approveLeaveRequestDto: ApproveLeaveRequestDto): Promise<LeaveRequest> {
    const leaveRequest = await this.findOneRequest(id);
    
    if (leaveRequest.status !== LeaveStatus.PENDING) {
      throw new BadRequestException('Only pending leave requests can be approved or rejected');
    }
    
    leaveRequest.status = approveLeaveRequestDto.approved ? LeaveStatus.APPROVED : LeaveStatus.REJECTED;
    leaveRequest.comments = approveLeaveRequestDto.comments;
    leaveRequest.approved_by = approveLeaveRequestDto.approver_id;
    leaveRequest.approved_at = new Date();
    
    return this.leaveRequestsRepository.save(leaveRequest);
  }
}
