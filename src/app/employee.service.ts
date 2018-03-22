import { Injectable } from '@angular/core';
import { Employee } from './employee';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EmployeeService {

  constructor(
    private http: HttpClient,
  ) { }

  private employeesUrl = 'api/employees';

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        catchError(this.handleError('getEmployees', []))
      );
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee, httpOptions).pipe(
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.employeesUrl, employee, httpOptions).pipe(
      catchError(this.handleError<any>('updateEmployee'))
    )
  }

  deleteEmployee(employee: Employee) {
    const id = employee.id;
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete(url, httpOptions).pipe(
      catchError(this.handleError<Employee>('deleteEmployee'))
    )
  }
}
