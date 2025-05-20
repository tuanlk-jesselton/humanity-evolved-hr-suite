
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
import { PayrollService } from './payroll.service';
import {
  CreatePayrollCycleDto,
  UpdatePayrollCycleDto,
  CreatePayrollRunDto,
  UpdatePayrollRunDto,
  GeneratePayslipsDto,
} from './dto';
import { RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Payroll')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payroll')
export class PayrollController {
  private readonly logger = new Logger(PayrollController.name);

  constructor(private readonly payrollService: PayrollService) {}

  @Get('cycles')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Get all payroll cycles' })
  @ApiQuery({ name: 'companyId', required: false, type: 'number' })
  async findAllCycles(@Query('companyId') companyId?: number) {
    try {
      return await this.payrollService.findAllCycles(companyId);
    } catch (error) {
      this.logger.error(`Error fetching payroll cycles: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to fetch payroll cycles',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('cycles/:id')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Get payroll cycle by id' })
  @ApiParam({ name: 'id', type: 'number' })
  async findOneCycle(@Param('id') id: string) {
    try {
      const cycle = await this.payrollService.findOneCycle(+id);
      if (!cycle) {
        throw new HttpException('Payroll cycle not found', HttpStatus.NOT_FOUND);
      }
      return cycle;
    } catch (error) {
      this.logger.error(`Error fetching payroll cycle: ${error.message}`);
      throw error;
    }
  }

  @Post('cycles')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Create new payroll cycle' })
  async createCycle(@Body() createPayrollCycleDto: CreatePayrollCycleDto) {
    try {
      return await this.payrollService.createCycle(createPayrollCycleDto);
    } catch (error) {
      this.logger.error(`Error creating payroll cycle: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to create payroll cycle',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('cycles/:id')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Update payroll cycle' })
  @ApiParam({ name: 'id', type: 'number' })
  async updateCycle(@Param('id') id: string, @Body() updatePayrollCycleDto: UpdatePayrollCycleDto) {
    try {
      return await this.payrollService.updateCycle(+id, updatePayrollCycleDto);
    } catch (error) {
      this.logger.error(`Error updating payroll cycle: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to update payroll cycle',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('cycles/:id')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Delete payroll cycle' })
  @ApiParam({ name: 'id', type: 'number' })
  async removeCycle(@Param('id') id: string) {
    try {
      return await this.payrollService.removeCycle(+id);
    } catch (error) {
      this.logger.error(`Error deleting payroll cycle: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to delete payroll cycle',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('runs')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Get all payroll runs' })
  @ApiQuery({ name: 'cycleId', required: false, type: 'number' })
  @ApiQuery({ name: 'status', required: false })
  async findAllRuns(
    @Query('cycleId') cycleId?: number,
    @Query('status') status?: string,
  ) {
    try {
      return await this.payrollService.findAllRuns(cycleId, status);
    } catch (error) {
      this.logger.error(`Error fetching payroll runs: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to fetch payroll runs',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('runs/:id')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Get payroll run by id' })
  @ApiParam({ name: 'id', type: 'number' })
  async findOneRun(@Param('id') id: string) {
    try {
      const run = await this.payrollService.findOneRun(+id);
      if (!run) {
        throw new HttpException('Payroll run not found', HttpStatus.NOT_FOUND);
      }
      return run;
    } catch (error) {
      this.logger.error(`Error fetching payroll run: ${error.message}`);
      throw error;
    }
  }

  @Post('runs')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Create new payroll run' })
  async createRun(@Body() createPayrollRunDto: CreatePayrollRunDto) {
    try {
      return await this.payrollService.createRun(createPayrollRunDto);
    } catch (error) {
      this.logger.error(`Error creating payroll run: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to create payroll run',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('runs/:id')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Update payroll run' })
  @ApiParam({ name: 'id', type: 'number' })
  async updateRun(@Param('id') id: string, @Body() updatePayrollRunDto: UpdatePayrollRunDto) {
    try {
      return await this.payrollService.updateRun(+id, updatePayrollRunDto);
    } catch (error) {
      this.logger.error(`Error updating payroll run: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to update payroll run',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('runs/:id')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Delete payroll run' })
  @ApiParam({ name: 'id', type: 'number' })
  async removeRun(@Param('id') id: string) {
    try {
      return await this.payrollService.removeRun(+id);
    } catch (error) {
      this.logger.error(`Error deleting payroll run: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to delete payroll run',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('runs/:id/generate')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Generate payslips for a payroll run' })
  @ApiParam({ name: 'id', type: 'number' })
  async generatePayslips(
    @Param('id') id: string,
    @Body() generatePayslipsDto: GeneratePayslipsDto,
  ) {
    try {
      return await this.payrollService.generatePayslips(+id, generatePayslipsDto);
    } catch (error) {
      this.logger.error(`Error generating payslips: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to generate payslips',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('runs/:id/payslips')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Get payslips for a payroll run' })
  @ApiParam({ name: 'id', type: 'number' })
  async getRunPayslips(@Param('id') id: string) {
    try {
      return await this.payrollService.getRunPayslips(+id);
    } catch (error) {
      this.logger.error(`Error fetching run payslips: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to fetch run payslips',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('employees/:id/payslips')
  @Roles('Super Admin', 'Company Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get payslips for an employee' })
  @ApiParam({ name: 'id', type: 'number' })
  async getEmployeePayslips(@Param('id') id: string) {
    try {
      return await this.payrollService.getEmployeePayslips(+id);
    } catch (error) {
      this.logger.error(`Error fetching employee payslips: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to fetch employee payslips',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
