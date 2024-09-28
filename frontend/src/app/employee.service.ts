import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8080/api/v1/employees";
  constructor(private httpClient: HttpClient) { 
    
  }
  getEmployeesList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }
  createEmployee(employee: Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, employee);
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  /** 
  updateEmployee(id: number, employee: Employee): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }
**/
  updateEmployee(id: number, updatePayload: any): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, updatePayload);
  }
  
  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }

  getEmployeeByFirstNameAndLastName(firstName: string, lastName: string): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}/filterByFirstNameAndLastName?firstName=${firstName}&lastName=${lastName}`);
  }

  getEmployeeByLastNameAndLocation(lastName: string, location: string): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}/filterbyLastNameAndLocation?lastName=${lastName}&location=${location}`);
  }
}
