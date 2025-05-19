/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CoreHrModule } from './modules/core-hr/core-hr.module';
import { ComplianceModule } from './modules/compliance/compliance.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { ClaimsModule } from './modules/claims/claims.module';
import { EmployeeSelfServiceModule } from './modules/employee-self-service/employee-self-service.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { LeaveManagementModule } from './modules/leave-management/leave-management.module';
import { LocalisationModule } from './modules/localisation/localisation.module';
import { ManagerSelfServiceModule } from './modules/manager-self-service/manager-self-service.module';
import { OffboardingModule } from './modules/offboarding/offboarding.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { PerformanceModule } from './modules/performance/performance.module';
import { SecurityModule } from './modules/security/security.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './modules/core-hr/entities/employee.entity';
import { Department } from './modules/core-hr/entities/department.entity';
import { EmployeeDocument } from './modules/core-hr/entities/employee-document.entity';
import { CustomField } from './modules/core-hr/entities/custom-field.entity';
import { EmployeeCustomFieldValue } from './modules/core-hr/entities/employee-custom-field-value.entity';
import { Organization } from './modules/core-hr/entities/organization.entity';
import { Goal } from './modules/performance/entities/goal.entity';
import { PerformanceReview } from './modules/performance/entities/performance-review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-667463e91a05-public.rds-pg.bytepluses.com',
      port: 5432,
      username: 'hrmonster',
      password: '@Jesselton2025',
      database: 'dev',
      entities: [
        Employee,
        Department,
        EmployeeDocument,
        CustomField,
        EmployeeCustomFieldValue,
        Organization,
        Goal,
        PerformanceReview
      ],
      synchronize: false, // Tạm thời tắt đồng bộ để revert migration an toàn
      migrationsRun: true,
      
    }),
    CoreHrModule,
    ComplianceModule,
    PayrollModule,
    AnalyticsModule,
    AttendanceModule,
    ClaimsModule,
    EmployeeSelfServiceModule,
    IntegrationsModule,
    LeaveManagementModule,
    LocalisationModule,
    ManagerSelfServiceModule,
    OffboardingModule,
    OnboardingModule,
    PerformanceModule,
    SecurityModule,
    SubscriptionModule,
    TypeOrmModule.forFeature([
      Employee,
      Department,
      EmployeeDocument,
      CustomField,
      EmployeeCustomFieldValue,
      Organization
    ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
