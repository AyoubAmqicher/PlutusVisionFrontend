import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class NoAthenticatedGuard {

  constructor(private authService : AuthService, private router : Router) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if ( !localStorage.getItem("app.token")) {
        return true;
    } else {
        if(this.authService.isUserInRole("ROLE_PRE_USER")){
            this.router.navigateByUrl("/verify");
            return true;
        }
        if(this.authService.isUserInRole("ROLE_USER")) {
            this.router.navigateByUrl("");
            return true;
        };
        if(this.authService.isUserInRole("CLIENT")) {
            this.router.navigateByUrl("");
            return false;
        };
        if(localStorage.getItem("app.roles")) {
            this.authService.logout();
            return true;
        }
        return false;
    }
}
}
