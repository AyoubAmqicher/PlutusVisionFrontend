import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) { }

  getTransactionsByBudgetId(budgetId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/budget/${budgetId}`);
  }

  cancelTransaction(transactionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${transactionId}`);
  }
}
