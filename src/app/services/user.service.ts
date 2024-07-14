import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  checkUsername(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.http.get<{ exists: boolean }>(`http://localhost:8080/api/users/check-username/${control.value}`).pipe(
        map(res => {
          return res.exists ? { usernameTaken: true } : null;
        }),
        catchError(() => of(null))
      );
    };
  }

  checkEmail(email: string): Observable<boolean> {
    const url = `http://localhost:8080/api/users/check-email/${email}`;
    return this.http.get<boolean>(url);
  }

  checkEmailPendingVerification(email: string): Observable<{ status: string }> {
    const url = `http://localhost:8080/api/users/verify-email-status?email=${email}`;
    return this.http.get<{ status: string }>(url);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/register', user);
  }

  checkVerificationCodeExpiry(email: string): Observable<{ isExpired: boolean, message: string }> {
    const url = `http://localhost:8080/api/users/check-verification-code-expiry?email=${email}`;
    return this.http.get<{ isExpired: boolean, message: string }>(url);
  }

  generateVerificationCode(email: string): Observable<{ isGenerated: boolean, message: string }> {
    const url = `http://localhost:8080/api/users/generate-verification-code?email=${email}`;
    return this.http.post<{ isGenerated: boolean, message: string }>(url, {});
  }

  verifyCode(email: string, code: string): Observable<{ isVerified: boolean, message: string }> {
    const url = `http://localhost:8080/api/users/verify-code?email=${email}&code=${code}`;
    return this.http.post<{ isVerified: boolean, message: string }>(url, {});
  }
}
