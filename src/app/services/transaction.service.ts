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

  saveTransaction(transactionDTO: any,budgetId : number): Observable<void> {
    const url = `${this.baseUrl}/save?budgetId=${budgetId}`;
    return this.http.post<void>(url, transactionDTO);
  }

  getComingIncomeTransactions(budgetId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/coming-income?userId=${budgetId}`);
  }

  getComingFutureIncomeTransactions(budgetId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/coming-future-income?userId=${budgetId}`);
  }

  confirmIncome(IncomeId : number): Observable<void> {
    const url = `${this.baseUrl}/confirm-income?id=${IncomeId}`;
    return this.http.put<void>(url,{});
  }

  getComingExpenseTransactions(budgetId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/coming-expense?userId=${budgetId}`);
  }

  getComingFutureExpenseTransactions(budgetId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/coming-future-expense?userId=${budgetId}`);
  }

  confirmExpense(ExpenseId : number): Observable<void> {
    const url = `${this.baseUrl}/confirm-expense?id=${ExpenseId}`;
    return this.http.put<void>(url,{});
  }
}
