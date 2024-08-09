import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private baseUrl = 'http://localhost:8080/api/budgets';

  constructor(private http: HttpClient) { }

  findAvailableBudgets(amount: number, date: string, categoryId: number): Observable<any> {
    const params = new HttpParams()
      .set('amount', amount.toString())
      .set('date', date)
      .set('categoryId', categoryId.toString());

    return this.http.get(`${this.baseUrl}/available`, { params });
  }

  saveTransaction(budget : any,userId : string): Observable<void> {
    const url = `${this.baseUrl}/save?userId=${userId}`;
    return this.http.post<void>(url, budget);
  }
}
