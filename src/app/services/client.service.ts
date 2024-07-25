import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) { }

  getFullName(id: string): Observable<{fullName : string}> {
    const url = `${this.baseUrl}/${id}/full-name`;
    return this.http.get<{fullName : string}> (url);
  }

  getUsername(id: string): Observable<{username : string}> {
    const url = `${this.baseUrl}/${id}/username`;
    return this.http.get<{username : string}> (url);
  }

  getBalnce(id: string): Observable<{balance : number}> {
    const url = `${this.baseUrl}/${id}/balance`;
    return this.http.get<{balance : number}> (url);
  }

  getPotentialBalance(id: string, futureDate: string): Observable<{potentialBalance: number}> {
    const url = `${this.baseUrl}/${id}/potential-balance?futureDate=${futureDate}`;
    return this.http.get<{potentialBalance: number}>(url);
  }

  saveTransaction(transactionDTO: any): Observable<void> {
    const url = `${this.baseUrl}/transactions/save`;
    return this.http.post<void>(url, transactionDTO);
  }

  getStableTransactions(id: string): Observable<any[]> {
    const url = `${this.baseUrl}/${id}/stable-transactions`;
    return this.http.get<any[]>(url);
  }

  getConfirmedTransactions(id: string): Observable<any[]> {
    const url = `${this.baseUrl}/${id}/confirmed-transactions`;
    return this.http.get<any[]>(url);
  }

  updateStableTransaction(id: number, transactionDTO: any): Observable<void> {
    const url = `${this.baseUrl}/stable/transactions/${id}`;
    return this.http.put<void>(url, transactionDTO);
  }

  deleteTransaction(transactionId: number): Observable<void> {
    const url = `${this.baseUrl}/transactions/${transactionId}`;
    return this.http.delete<void>(url);
  }

  getCurrentPotentialBalance(id: string): Observable<{ currentPotentialBalance: number }> {
    const url = `${this.baseUrl}/${id}/current-potential-balance`;
    return this.http.get<{ currentPotentialBalance: number }>(url);
  }

  updateBalance(userId: string, newBalance: number): Observable<void> {
    const url = `${this.baseUrl}/${userId}/balance`;
    return this.http.put<void>(url, { balance: newBalance });
  }
}
