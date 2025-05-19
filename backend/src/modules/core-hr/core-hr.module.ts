import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Department } from './entities/department.entity';
import { EmployeeDocument } from './entities/employee-document.entity';
import { CustomField } from './entities/custom-field.entity';
import { EmployeeCustomFieldValue } from './entities/employee-custom-field-value.entity';
import { EmployeeService } from './services/employee.service';
import { DepartmentService } from './services/department.service';
import { EmployeeDocumentService } from './services/employee-document.service';
import { CustomFieldService } from './services/custom-field.service';
import { EmployeeCustomFieldValueService } from './services/employee-custom-field-value.service';
import { EmployeeController } from './controllers/employee.controller';
import { DepartmentController } from './controllers/department.controller';
import { EmployeeDocumentController } from './controllers/employee-document.controller';
import { CustomFieldController } from './controllers/custom-field.controller';
import { EmployeeCustomFieldValueController } from './controllers/employee-custom-field-value.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Department,
      EmployeeDocument,
      CustomField,
      EmployeeCustomFieldValue,
    ]),
  ],
  controllers: [
    EmployeeController,
    DepartmentController,
    EmployeeDocumentController,
    CustomFieldController,
    EmployeeCustomFieldValueController,
  ],
  providers: [
    EmployeeService,
    DepartmentService,
    EmployeeDocumentService,
    CustomFieldService,
    EmployeeCustomFieldValueService,
  ],
  exports: [
    EmployeeService,
    DepartmentService,
    EmployeeDocumentService,
    CustomFieldService,
    EmployeeCustomFieldValueService,
  ],
})
export class CoreHrModule {}
