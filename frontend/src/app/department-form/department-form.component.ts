import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../department.service';
import { Department } from '../models/department';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  department: Department = new Department();  // Department object to be created or updated
  isEditMode: boolean = false;  // Flag to check if it's update mode

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute  // Used to fetch route params
  ) {}

  ngOnInit(): void {
    const departmentId = this.route.snapshot.paramMap.get('departmentId');
    if (departmentId) {
      this.isEditMode = true;  // We are in edit mode
      this.departmentService.getDepartment(+departmentId).subscribe(data => {
        this.department = data;  // Populate form with department data
      });
    }
  }

  // Save or update the department based on mode
  onSubmit(): void {
    if (this.isEditMode) {
      this.updateDepartment();
    } else {
      this.saveDepartment();
    }
  }

  // Create a new department
  saveDepartment() {
    this.departmentService.createDepartment(this.department).subscribe(
      (data) => {
        console.log('Department created:', data);
        this.goToDepartmentList();
      },
      (error) => {
        console.error('Error creating department:', error);
      }
    );
  }

  // Update an existing department
  updateDepartment() {
    this.departmentService.updateDepartment(this.department.departmentId!, this.department).subscribe(
      (data) => {
        console.log('Department updated:', data);
        this.goToDepartmentList();
      },
      (error) => {
        console.error('Error updating department:', error);
      }
    );
  }

  // Navigate back to the department list after saving/updating
  goToDepartmentList() {
    this.router.navigate(['/departments']);
  }
}
