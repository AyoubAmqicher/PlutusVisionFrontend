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
}
