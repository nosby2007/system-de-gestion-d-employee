import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  addEmpURL : string;
  getEmpURL : string;
  updateEmpUrl: string;

  constructor(private http : HttpClient) {
    this.addEmpURL = 'http://localhost:9091/emp/addEmployee';
    this.getEmpURL = 'http://localhost:9091/emp/getAll';
    this.updateEmpUrl = 'http://localhost:9091/emp/updateEmployee';
  } 
  addEmployee(emp : Employee): Observable<Employee> {
    return this.http.post<Employee>(this.addEmpURL,emp)
  }

  getAllEmployee(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.getEmpURL);
  }

  updateEmployee(emp : Employee) {
    return this.http.put<Employee>(this.updateEmpUrl, emp);
  }


}

