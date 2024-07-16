import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token?: string, errorMessage?: string }> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + window.btoa(username + ':' + password)
      }),
      responseType: 'json' as 'json'
    };

    return this.http.post<{ token: string }>(`${this.apiUrl}/api/auth`, null, httpOptions)
      .pipe(
        map(response => {
          return { token: response.token };
        })
      );
  }

  isUserInRole(roleFromRoute: string) {
    const roles = sessionStorage.getItem("app.roles");

    if (roles!.includes(",")) {
        if (roles === roleFromRoute) {
            return true;
        }
    } else {
        const roleArray = roles!.split(",");
        for (let role of roleArray) {
            if (role === roleFromRoute) {
                return true;
            }
        }
    }
    return false;
}
}
