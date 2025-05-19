import { Injectable } from '@nestjs/common';

@Injectable()
export class ManagerSelfServiceService {
  getHello(): string {
    return 'Hello from Manager Self Service!';
  }
}
