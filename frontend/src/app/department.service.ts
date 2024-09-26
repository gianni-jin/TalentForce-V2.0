import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from './models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseURL = "http://localhost:8080/api/v1/departments";

  constructor(private httpClient: HttpClient) { }

  // Fetch the list of departments
  getDepartmentsList(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(`${this.baseURL}`);
  }

  // Fetch a single department by departmentId
  getDepartment(departmentId: number): Observable<Department> {
    return this.httpClient.get<Department>(`${this.baseURL}/${departmentId}`);
  }

  // Create a new department
  createDepartment(department: Department): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, department);
  }

  // Update an existing department by departmentId
  updateDepartment(departmentId: number, department: Department): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${departmentId}`, department);
  }

  // Delete a department by departmentId
  deleteDepartment(departmentId: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${departmentId}`);
  }
}
