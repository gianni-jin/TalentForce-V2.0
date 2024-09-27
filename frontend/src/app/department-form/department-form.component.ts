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
  department: Department = new Department();  
  isEditMode: boolean = false;  

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute  
  ) {}

  ngOnInit(): void {
    const departmentId = this.route.snapshot.paramMap.get('departmentId');
    if (departmentId) {
      this.isEditMode = true;  
      this.departmentService.getDepartment(+departmentId).subscribe(data => {
        this.department = data;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateDepartment();
    } else {
      this.saveDepartment();
    }
  }

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

  goToDepartmentList() {
    this.router.navigate(['/departments']);
  }
}
