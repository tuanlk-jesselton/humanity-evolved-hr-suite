import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollItemController } from './controllers/payroll-item.controller';
import { PayrollRunController } from './controllers/payroll-run.controller';
import { PayItemTypeService } from './services/pay-item-type.service';
import { PayrollItemService } from './services/payroll-item.service';
import { PayrollRunService } from './services/payroll-run.service';
import { PayItemType } from './entities/pay-item-type.entity';
import { PayrollItem } from './entities/payroll-item.entity';
import { PayrollRun } from './entities/payroll-run.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PayItemType, PayrollItem, PayrollRun])],
  controllers: [PayrollItemController, PayrollRunController],
  providers: [PayItemTypeService, PayrollItemService, PayrollRunService],
})
export class PayrollModule {}
