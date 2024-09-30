import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'; 
import { Employee } from '../models/employee'; 
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../department.service'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  selectedSearchOption: string = '';  
  employees: Employee[] = [];
  employeeId!: number; 
  firstName!: string;  
  lastName!: string;   
  location!: string;   

  searchResults: Employee[] = []; 

  constructor(private employeeService: EmployeeService,
              private departmentService: DepartmentService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const departmentId = this.route.snapshot.paramMap.get('departmentId');
    if (departmentId) {
      this.getEmployeesByDepartment(+departmentId);
    } else {
      this.getEmployees();
    }
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

  // Fetch all employees
  getEmployees(): void {
    this.employeeService.getEmployeesList().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  // searchById
  searchById(): void {
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe(
        (data) => {
          this.searchResults = [data];
        },
        (error) => {
          console.error('Error fetching employee by ID:', error);
        }
      );
    } else {
      console.log('Employee ID is required for search');
    }
  }

  // searchByFirstNameAndLastName
  searchByFirstNameAndLastName(): void {
    if (this.firstName && this.lastName) {
      this.employeeService.getEmployeeByFirstNameAndLastName(this.firstName, this.lastName).subscribe(
        (data) => {
          this.searchResults = data;
        },
        (error) => {
          console.error('Error fetching employees by name:', error);
        }
      );
    } else {
      console.log('First name and last name are required for search');
    }
  }

  // searchByLastNameAndLocation
  searchByLastNameAndLocation(): void {
    if (this.lastName && this.location) {
      this.employeeService.getEmployeeByLastNameAndLocation(this.lastName, this.location).subscribe(
        (data) => {
          this.searchResults = data;
        },
        (error) => {
          console.error('Error fetching employees by last name and location:', error);
        }
      );
    } else {
      console.log('Last name and location are required for search');
    }
  }

  updateEmployee(employeeId: number): void {
    const selectedEmployee = this.employees.find(emp => emp.employeeId === employeeId);

    if (selectedEmployee) {
      this.router.navigate([`/employee-form`, employeeId]);
    } else {
      console.error('Employee not found');
    }
  }

  deleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      () => {
        this.getEmployees(); 
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }
}
