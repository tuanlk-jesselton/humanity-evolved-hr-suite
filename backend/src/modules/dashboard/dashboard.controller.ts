import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @Roles('Super Admin')
  @ApiOkResponse({ description: 'Returns platform statistics' })
  async getPlatformStats() {
    return this.dashboardService.getPlatformStats();
  }

  @Get('companies')
  @Roles('Super Admin')
  @ApiOkResponse({ description: 'Returns list of companies' })
  async getCompanies() {
    return this.dashboardService.getCompanies();
  }

  @Get('alerts')
  @Roles('Super Admin')
  @ApiOkResponse({ description: 'Returns system alerts' })
  async getSystemAlerts() {
    return this.dashboardService.getSystemAlerts();
  }
}
