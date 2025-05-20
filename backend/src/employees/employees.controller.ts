
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Employees')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('employees')
export class EmployeesController {
  private readonly logger = new Logger(EmployeesController.name);

  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @Roles('Super Admin', 'Company Admin', 'Manager')
  @ApiOperation({ summary: 'Get all employees' })
  @ApiQuery({ name: 'companyId', required: false, type: 'number' })
  @ApiQuery({ name: 'departmentId', required: false, type: 'number' })
  @ApiQuery({ name: 'managerId', required: false, type: 'number' })
  async findAll(
    @Query('companyId') companyId?: number,
    @Query('departmentId') departmentId?: number,
    @Query('managerId') managerId?: number,
  ) {
    try {
      return await this.employeesService.findAll(companyId, departmentId, managerId);
    } catch (error) {
      this.logger.error(`Error fetching employees: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to fetch employees',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @Roles('Super Admin', 'Company Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get employee by id' })
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(@Param('id') id: string) {
    try {
      const employee = await this.employeesService.findOne(+id);
      if (!employee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }
      return employee;
    } catch (error) {
      this.logger.error(`Error fetching employee: ${error.message}`);
      throw error;
    }
  }

  @Post()
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Create new employee' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      return await this.employeesService.create(createEmployeeDto);
    } catch (error) {
      this.logger.error(`Error creating employee: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to create employee',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @Roles('Super Admin', 'Company Admin', 'Manager')
  @ApiOperation({ summary: 'Update employee' })
  @ApiParam({ name: 'id', type: 'number' })
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    try {
      return await this.employeesService.update(+id, updateEmployeeDto);
    } catch (error) {
      this.logger.error(`Error updating employee: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to update employee',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Delete employee' })
  @ApiParam({ name: 'id', type: 'number' })
  async remove(@Param('id') id: string) {
    try {
      return await this.employeesService.remove(+id);
    } catch (error) {
      this.logger.error(`Error deleting employee: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to delete employee',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/employment-details')
  @Roles('Super Admin', 'Company Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get employee employment details' })
  @ApiParam({ name: 'id', type: 'number' })
  async getEmploymentDetails(@Param('id') id: string) {
    try {
      return await this.employeesService.getEmploymentDetails(+id);
    } catch (error) {
      this.logger.error(`Error fetching employment details: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to fetch employment details',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/salary')
  @Roles('Super Admin', 'Company Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get employee salary information' })
  @ApiParam({ name: 'id', type: 'number' })
  async getSalaryInfo(@Param('id') id: string) {
    try {
      return await this.employeesService.getSalaryInfo(+id);
    } catch (error) {
      this.logger.error(`Error fetching salary information: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to fetch salary information',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/documents')
  @Roles('Super Admin', 'Company Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get employee documents' })
  @ApiParam({ name: 'id', type: 'number' })
  async getDocuments(@Param('id') id: string) {
    try {
      return await this.employeesService.getDocuments(+id);
    } catch (error) {
      this.logger.error(`Error fetching documents: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to fetch documents',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
