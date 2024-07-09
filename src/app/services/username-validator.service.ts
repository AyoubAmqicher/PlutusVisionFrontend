import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernameValidatorService {

  constructor(private http : HttpClient) { }

  checkUsername() : AsyncValidatorFn {
    return (control : AbstractControl) : Observable<{[key : string] : any} | null> => {
      if (!control.value) {
        return of(null); // Return null if the control value is empty to avoid unnecessary API calls
      }
      return this.http.get<{ exists : boolean }>(`http://localhost:8080/api/check-username/${control.value}`).pipe(
        map(res => {
          return res.exists ? { usernameTaken : true } : null
        }),
        catchError(()=>of(null))
      );
    };
  }
}
