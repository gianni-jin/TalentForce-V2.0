export class Department {
    departmentId!: number;  // departmentId is optional because it will be set by the backend
    name: string = '';
    employeeIds: number[] = [];
}
