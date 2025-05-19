import { Controller, Get } from '@nestjs/common';
import { ManagerSelfServiceService } from '../services/manager-self-service.service';

@Controller('manager-self-service')
export class ManagerSelfServiceController {
  constructor(
    private readonly managerSelfServiceService: ManagerSelfServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.managerSelfServiceService.getHello();
  }
}
