import { ContractType } from './enums/contract-type.enum';
import { EmploymentStatus } from './enums/employment-status.enum';
import { Department } from './department';

export class Employee {
  employeeId!: number;
  firstName: string = '';
  lastName: string = '';
  age: number = 0;
  gender: string = '';
  email: string = '';
  location: string = '';
  phoneNumber?: string;
  contractType?: ContractType;
  employmentStatus?: EmploymentStatus;
  salary?: number;
  hireDate?: string;
  department: Department = new Department();
}
