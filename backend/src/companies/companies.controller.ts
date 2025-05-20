
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
import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Companies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('companies')
export class CompaniesController {
  private readonly logger = new Logger(CompaniesController.name);

  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @Roles('Super Admin')
  @ApiOperation({ summary: 'Get all companies' })
  @ApiQuery({ name: 'name', required: false, description: 'Filter by company name' })
  async findAll(@Query('name') name?: string) {
    try {
      return await this.companiesService.findAll(name);
    } catch (error) {
      this.logger.error(`Error fetching companies: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to fetch companies',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Get company by id' })
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(@Param('id') id: string) {
    try {
      const company = await this.companiesService.findOne(+id);
      if (!company) {
        throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
      }
      return company;
    } catch (error) {
      this.logger.error(`Error fetching company: ${error.message}`);
      throw error;
    }
  }

  @Post()
  @Roles('Super Admin')
  @ApiOperation({ summary: 'Create new company' })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    try {
      return await this.companiesService.create(createCompanyDto);
    } catch (error) {
      this.logger.error(`Error creating company: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to create company',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(':id')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Update company' })
  @ApiParam({ name: 'id', type: 'number' })
  async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    try {
      return await this.companiesService.update(+id, updateCompanyDto);
    } catch (error) {
      this.logger.error(`Error updating company: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to update company',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @Roles('Super Admin')
  @ApiOperation({ summary: 'Delete company' })
  @ApiParam({ name: 'id', type: 'number' })
  async remove(@Param('id') id: string) {
    try {
      return await this.companiesService.remove(+id);
    } catch (error) {
      this.logger.error(`Error deleting company: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to delete company',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id/departments')
  @Roles('Super Admin', 'Company Admin')
  @ApiOperation({ summary: 'Get company departments' })
  @ApiParam({ name: 'id', type: 'number' })
  async getDepartments(@Param('id') id: string) {
    try {
      return await this.companiesService.getDepartments(+id);
    } catch (error) {
      this.logger.error(`Error fetching company departments: ${error.message}`);
      throw new HttpException(
        error.message || 'Failed to fetch company departments',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
