import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DepartmentListComponent } from './department-list/department-list.component'; 
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentEmployeesComponent } from './department-employees/department-employees.component'

const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'departments', component: DepartmentListComponent },
  { path: 'employee-form', component: EmployeeFormComponent }, 
  { path: 'employee-form/:employeeId', component: EmployeeFormComponent },
  { path: 'department-form', component: DepartmentFormComponent }, 
  { path: 'department-form/:departmentId', component: DepartmentFormComponent },
  { path: 'departments/:departmentId/employees', component: DepartmentEmployeesComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/employees', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
