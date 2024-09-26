import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DepartmentListComponent } from './department-list/department-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';  // Corrected import
import { RouterModule } from '@angular/router';
import { DepartmentFormComponent } from './department-form/department-form.component';  // Ensure RouterModule is imported



@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    DepartmentListComponent,
    EmployeeFormComponent,
    DepartmentFormComponent // Corrected declaration
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Import this if you're using HTTP requests
    FormsModule,
    RouterModule         // Add FormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
