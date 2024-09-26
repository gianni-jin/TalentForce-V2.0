import { Department } from "./department";

export class Employee {
    employeeId!: number;  // Definite assignment assertion
    firstName: string = '';
    lastName: string = '';
    age: number = 18;
    gender: 'M' | 'F' = 'M';
    location: string | null = null;
    email: string = '';
    department: Department = new Department();
    }
      