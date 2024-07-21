import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import  { JwtPayload,jwtDecode } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  firstName: string;
  lastName: string;
  scope: string;
  email: string;
  id : string
}

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

  isUserInRole(roleFromRoute: string): boolean {
    const role = this.getUserRole();
    return role === roleFromRoute;
  }

  logout() {
    localStorage.removeItem("app.token");
    localStorage.removeItem("app.roles");
    window.location.href = `/signin`;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    // console.log(token);
    if (token) {
      // const decodedToken = jwtDecode<CustomJwtPayload>(response.token);

      const decodedToken =  jwtDecode<CustomJwtPayload>(token);
      return decodedToken.scope || null;  // Adjust according to your token structure
    }
    return null;
  }

  getUserId(): string | null {
    const token = localStorage.getItem('app.token');
    if (token) {
      const decodedToken =  jwtDecode<CustomJwtPayload>(token);
      return decodedToken.id || null;  // Adjust according to your token structure
    }
    return null;
  }

  validateToken(token: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      responseType: 'text' as 'json'
    };

    return this.http.get(`${this.apiUrl}/api/auth/validate-token`, httpOptions)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  getToken(): string | null {
    const token = localStorage.getItem('app.token');
    if (token) {
       this.validateToken(token).subscribe( isValid => {
        if (isValid) {
          return token;
        } else {
          this.logout();
          return null;
        }
      });
        
    }
    return  token;
  }
}
