import { Controller, Get } from '@nestjs/common';
import { EmployeeSelfServiceService } from '../services/employee-self-service.service';

@Controller('employee-self-service')
export class EmployeeSelfServiceController {
  constructor(
    private readonly employeeSelfServiceService: EmployeeSelfServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.employeeSelfServiceService.getHello();
  }
}
