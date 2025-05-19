import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeSelfServiceService {
  getHello(): string {
    return 'Hello from Employee Self Service!';
  }
}
