import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationGuard {

  constructor(private authService : AuthService, private router : Router) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if ( !!localStorage.getItem("app.token") && this.authService.isUserInRole(next.routeConfig?.data?.['role'])) {
        return true;
    } else {
        this.router.navigateByUrl("/signin");
        return false;
    }
}
}
