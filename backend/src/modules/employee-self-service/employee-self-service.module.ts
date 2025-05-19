import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeSelfServiceController } from './controllers/employee-self-service.controller';
import { EmployeeSelfServiceService } from './services/employee-self-service.service';
import { EmployeeSelfService } from './entities/employee-self-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeSelfService])],
  controllers: [EmployeeSelfServiceController],
  providers: [EmployeeSelfServiceService],
})
export class EmployeeSelfServiceModule {}
