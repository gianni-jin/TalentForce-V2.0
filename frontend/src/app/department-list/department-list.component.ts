import { Component, OnInit } from '@angular/core';
import { Department } from '../models/department';  
import { DepartmentService } from '../department.service';  
import { Router } from '@angular/router';  

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];  

  constructor(private departmentService: DepartmentService, private router: Router) {}

  ngOnInit(): void {
    this.getDepartments(); 
  }

  getDepartments(): void {
    this.departmentService.getDepartmentsList().subscribe(
      (data) => {
        this.departments = data;
        console.log('Departments:', this.departments);
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  deleteDepartment(departmentId: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(departmentId).subscribe(
        () => {
          this.departments = this.departments.filter(dept => dept.departmentId !== departmentId); 
          console.log('Department deleted');
        },
        (error) => {
          console.error('Error deleting department:', error);
        }
      );
    }
  }

  updateDepartment(departmentId: number): void {
    this.router.navigate([`/department-form`, departmentId]);  
  }

  viewEmployeesByDepartment(departmentId: number): void {
    if (departmentId) {
      this.router.navigate([`/departments/${departmentId}/employees`]);
    } else {
      console.error('No department ID found for this employee');
    }
  }
}
