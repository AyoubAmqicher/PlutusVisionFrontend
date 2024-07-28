import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, lastValueFrom, map, Observable, of } from 'rxjs';
import { ClientService } from './client.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl = 'http://localhost:8080/api/users';
  username='';

  constructor(private http: HttpClient, private clientService : ClientService,private authService : AuthService) { }

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

  checkUsernameforAuthenticated(): AsyncValidatorFn {
    const userId = this.authService.getUserId();
     this.username = ''
    if(userId){
      this.clientService.getUsername(userId).subscribe(response =>{
        this.username = response.username;
      })
    }
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if(this.username != control.value){
        return this.http.get<{ exists: boolean }>(`http://localhost:8080/api/users/check-username/${control.value}`).pipe(
          map(res => {
            return res.exists  ? { usernameTaken: true } : null;
          }),
          catchError(() => of(null))
        );
      }

      return of(null);
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

  async registerUser(user: any): Promise<any> {
    try {
      const response = await lastValueFrom(this.http.post(`${this.baseUrl}/register`, user));
      return response;
    } catch (error) {
      throw error;
    }
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

  checkTokenExpiry(email: string): Observable<{ isValid: boolean, message: string }> {
    const url = `http://localhost:8080/api/users/verify-reset-token?email=${email}`;
    return this.http.get<{ isValid: boolean, message: string }>(url);
  }

  sendEmailToken(email: string): Observable<{  message: string }> {
    const url = `http://localhost:8080/api/users/password-reset-token?email=${email}`;
    return this.http.post<{ message: string }>(url, {});
  }

  changePassword(token: string, newPassword: string): Observable<{ hasChanged: boolean, message: string }> {
    const body = { token, newPassword };
    return this.http.post<{ hasChanged: boolean, message: string }>(`${this.baseUrl}/change-password`, body);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/authenticated/user/${id}`);
  }

  updateUser(user: any,id : string): Observable<any> {
    return this.http.put(`http://localhost:8080/api/authenticated/user/${id}`, user);
  }

  changeEmail(id: string, newEmail: string): Observable<any> {
    return this.http.put(`http://localhost:8080/api/authenticated/user/${id}/change-email?newEmail=${newEmail}`, {});
  }
}
