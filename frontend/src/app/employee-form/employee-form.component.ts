import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { DepartmentService } from '../department.service';
import { Employee } from '../models/employee';
import { Department } from '../models/department';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = new Employee();
  departments: Department[] = [];
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDepartments();
    const employeeId = this.route.snapshot.paramMap.get('employeeId');
    if (employeeId) {
      this.isEditMode = true;
      this.getEmployeeById(+employeeId);
    } else {
      this.isEditMode = false;
      this.employee = new Employee();
    }
  }

  getDepartments() {
    this.departmentService.getDepartmentsList().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  getEmployeeById(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => {
        console.error('Error fetching employee:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateEmployee();
    } else {
      this.createEmployee();
    }
  }
  
  createEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe(
      (data) => {
        console.log('Employee created:', data);
        this.router.navigate(['/employees']);
      },
      (error) => {
        console.error('Error creating employee:', error);
      }
    );
  }

  updateEmployee() {
    if (this.employee.employeeId !== undefined && this.employee.employeeId !== null) {
      this.employeeService.updateEmployee(this.employee.employeeId, this.employee).subscribe(
        (data) => {
          console.log('Employee updated:', data);
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    } else {
      console.error('Employee ID is undefined or null');
    }
  }

  onDelete(): void {
    if (this.employee.employeeId !== undefined && this.employee.employeeId !== null) {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.employeeService.deleteEmployee(this.employee.employeeId).subscribe(
          () => {
            console.log('Employee deleted');
            this.router.navigate(['/employees']);
          },
          (error) => {
            console.error('Error deleting employee:', error);
          }
        );
      }
    } else {
      console.error('Employee ID is undefined or null');
    }
  }
}
