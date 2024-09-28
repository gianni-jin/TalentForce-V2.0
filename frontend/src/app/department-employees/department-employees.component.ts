import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-employees',
  templateUrl: './department-employees.component.html',
  styleUrls: ['./department-employees.component.css']
})
export class DepartmentEmployeesComponent implements OnInit {

  employees: Employee[] = [];
  departmentId!: number;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.departmentId = +this.route.snapshot.paramMap.get('departmentId')!;
    this.getEmployeesByDepartment(this.departmentId);
  }

  getEmployeesByDepartment(departmentId: number): void {
    this.departmentService.getEmployeesByDepartment(departmentId).subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees for department:', error);
      }
    );
  }
}