import { Component, OnInit } from '@angular/core';
import { Department } from '../models/department';  // Adjust the path if needed
import { DepartmentService } from '../department.service';  // Adjust the path if needed
import { Router } from '@angular/router';  // Import Router to navigate

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];  // List of departments

  constructor(private departmentService: DepartmentService, private router: Router) {}

  ngOnInit(): void {
    this.getDepartments();  // Fetch the list of departments on component initialization
  }

  // Fetch departments from the backend
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

  // Delete a department
  deleteDepartment(departmentId: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(departmentId).subscribe(
        () => {
          this.departments = this.departments.filter(dept => dept.departmentId !== departmentId);  // Remove the deleted department from the list
          console.log('Department deleted');
        },
        (error) => {
          console.error('Error deleting department:', error);
        }
      );
    }
  }

  // Update a department by navigating to the form with the department ID
  updateDepartment(departmentId: number): void {
    this.router.navigate([`/department-form`, departmentId]);  // Navigate to the update form
  }
}
