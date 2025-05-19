import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerSelfServiceController } from './controllers/manager-self-service.controller';
import { ManagerSelfServiceService } from './services/manager-self-service.service';
import { ManagerSelfService } from './entities/manager-self-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerSelfService])],
  controllers: [ManagerSelfServiceController],
  providers: [ManagerSelfServiceService],
})
export class ManagerSelfServiceModule {}
