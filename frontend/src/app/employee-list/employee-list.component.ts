import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'; 
import { Employee } from '../models/employee'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  employeeId!: number; 
  firstName!: string;  
  lastName!: string;   
  location!: string;   

  searchResults: Employee[] = []; 

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees(); 
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
    }
  }

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
    }
  }

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
    }
  }

updateEmployee(employeeId: number): void {
  const selectedEmployee = this.employees.find(emp => emp.employeeId === employeeId);

  if (selectedEmployee) {
    const updatedEmployee = {
      firstName: selectedEmployee.firstName,
      lastName: selectedEmployee.lastName,
      age: selectedEmployee.age,
      gender: selectedEmployee.gender,
      location: selectedEmployee.location,
      email: selectedEmployee.email,
      department: { departmentId: selectedEmployee.department.departmentId }
    };

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
