import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  checkTokenExpiry(token: string): Observable<{ isValid: boolean, message: string }> {
    const url = `http://localhost:8080/api/tokens?token=${token}`;
    return this.http.get<{ isValid: boolean, message: string }>(url);
  }
}
