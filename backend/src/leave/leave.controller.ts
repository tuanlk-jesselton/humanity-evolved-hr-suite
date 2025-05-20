
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
import { LeaveService } from './leave.service';
import {
  CreateLeaveTypeDto,
  UpdateLeaveTypeDto,
  CreateLeaveRequestDto,
  UpdateLeaveRequestDto,
  ApproveLeaveRequestDto,
} from './dto';
import { RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Leave')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class LeaveController {
  private readonly logger = new Logger(LeaveController.name);

  constructor(private readonly leaveService: LeaveService) {}

  @Get('leave-types')
  @Roles('Super Admin', 'Company Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get all leave types' })
  @ApiQuery({ name: 'companyId', required: false, type: 'number' })
  async findAllTypes(@Query('companyId') companyId?: number) {
    try {
      return await this.leaveService.findAllTypes(companyId);
    } catch (error) {
      this.logger.error(`Error fetching leave types: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to fetch leave types',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('leave-types')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Create new leave type' })
  async createType(@Body() createLeaveTypeDto: CreateLeaveTypeDto) {
    try {
      return await this.leaveService.createType(createLeaveTypeDto);
    } catch (error) {
      this.logger.error(`Error creating leave type: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to create leave type',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('leave-types/:id')
  @Roles('Super Admin', 'Company Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get leave type by id' })
  @ApiParam({ name: 'id', type: 'number' })
  async findOneType(@Param('id') id: string) {
    try {
      const leaveType = await this.leaveService.findOneType(+id);
      if (!leaveType) {
        throw new HttpException('Leave type not found', HttpStatus.NOT_FOUND);
      }
      return leaveType;
    } catch (error) {
      this.logger.error(`Error fetching leave type: ${error.message}`);
      throw error;
    }
  }

  @Put('leave-types/:id')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Update leave type' })
  @ApiParam({ name: 'id', type: 'number' })
  async updateType(@Param('id') id: string, @Body() updateLeaveTypeDto: UpdateLeaveTypeDto) {
    try {
      return await this.leaveService.updateType(+id, updateLeaveTypeDto);
    } catch (error) {
      this.logger.error(`Error updating leave type: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to update leave type',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('leave-types/:id')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Delete leave type' })
  @ApiParam({ name: 'id', type: 'number' })
  async removeType(@Param('id') id: string) {
    try {
      return await this.leaveService.removeType(+id);
    } catch (error) {
      this.logger.error(`Error deleting leave type: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to delete leave type',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('leave-requests')
  @Roles('Super Admin', 'Company Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get all leave requests' })
  @ApiQuery({ name: 'employeeId', required: false, type: 'number' })
  @ApiQuery({ name: 'status', required: false })
  async findAllRequests(
    @Query('employeeId') employeeId?: number,
    @Query('status') status?: string,
  ) {
    try {
      return await this.leaveService.findAllRequests(employeeId, status);
    } catch (error) {
      this.logger.error(`Error fetching leave requests: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to fetch leave requests',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('leave-requests/:id')
  @Roles('Super Admin', 'Company Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get leave request by id' })
  @ApiParam({ name: 'id', type: 'number' })
  async findOneRequest(@Param('id') id: string) {
    try {
      const leaveRequest = await this.leaveService.findOneRequest(+id);
      if (!leaveRequest) {
        throw new HttpException('Leave request not found', HttpStatus.NOT_FOUND);
      }
      return leaveRequest;
    } catch (error) {
      this.logger.error(`Error fetching leave request: ${error.message}`);
      throw error;
    }
  }

  @Post('leave-requests')
  @Roles('Super Admin', 'Company Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Create new leave request' })
  async createRequest(@Body() createLeaveRequestDto: CreateLeaveRequestDto) {
    try {
      return await this.leaveService.createRequest(createLeaveRequestDto);
    } catch (error) {
      this.logger.error(`Error creating leave request: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to create leave request',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('leave-requests/:id')
  @Roles('Super Admin', 'Company Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Update leave request' })
  @ApiParam({ name: 'id', type: 'number' })
  async updateRequest(@Param('id') id: string, @Body() updateLeaveRequestDto: UpdateLeaveRequestDto) {
    try {
      return await this.leaveService.updateRequest(+id, updateLeaveRequestDto);
    } catch (error) {
      this.logger.error(`Error updating leave request: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to update leave request',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('leave-requests/:id')
  @Roles('Super Admin', 'Company Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Delete leave request' })
  @ApiParam({ name: 'id', type: 'number' })
  async removeRequest(@Param('id') id: string) {
    try {
      return await this.leaveService.removeRequest(+id);
    } catch (error) {
      this.logger.error(`Error deleting leave request: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to delete leave request',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('leave-requests/:id/approve')
  @Roles('Super Admin', 'Company Admin', 'Manager')
  @ApiOperation({ summary: 'Approve or reject leave request' })
  @ApiParam({ name: 'id', type: 'number' })
  async approveRequest(
    @Param('id') id: string,
    @Body() approveLeaveRequestDto: ApproveLeaveRequestDto,
  ) {
    try {
      return await this.leaveService.approveRequest(+id, approveLeaveRequestDto);
    } catch (error) {
      this.logger.error(`Error approving leave request: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to approve leave request',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
