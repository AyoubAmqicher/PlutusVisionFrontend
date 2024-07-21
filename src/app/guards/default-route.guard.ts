import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class DefaultRouteGuard {

  constructor(private authService : AuthService, private router : Router) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getUserRole();

    if (role){
        if(role == "ROLE_PRE_USER"){
            this.router.navigateByUrl("/verify");
        }
        if(role == "ROLE_USER") {
            this.router.navigateByUrl("");
        };
        if( role == "CLIENT" ) {
            this.router.navigateByUrl("/transactions");
        };
    } else {
        this.authService.logout();
    }
    return false;
}
}
