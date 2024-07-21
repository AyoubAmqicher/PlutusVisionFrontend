import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class NoAthenticatedGuard {

  constructor(private authService : AuthService, private router : Router) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getUserRole();

    if ( !localStorage.getItem("app.token")) {
        return true;
    } else if (role){
        if(role == "ROLE_PRE_USER"){
            this.router.navigateByUrl("/verify");
            return true;
        }
        if(role == "ROLE_USER") {
            this.router.navigateByUrl("");
            return true;
        };
        if( role == "CLIENT" ) {
            this.router.navigateByUrl("/transactions");
            return false;
        };
    } else {
        this.authService.logout();
        return true;
    }
    return false;
}
}
