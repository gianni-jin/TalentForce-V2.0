import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DepartmentListComponent } from './department-list/department-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';  
import { RouterModule } from '@angular/router';
import { DepartmentFormComponent } from './department-form/department-form.component'; 
import { DepartmentService } from './department.service';
import { EmployeeService } from './employee.service'



@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    DepartmentListComponent,
    EmployeeFormComponent,
    DepartmentFormComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule        
  ],
  providers: [EmployeeService, DepartmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
