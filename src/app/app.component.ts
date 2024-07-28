import { Component, OnInit } from '@angular/core';
import { SidebarService } from './services/sidebar.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'PlutusVisionFrontend';
  isVisible = true;
  isLoggedIn = false; 

  constructor(private sidebarService : SidebarService,
    private breakpointObserver: BreakpointObserver,
    private authService : AuthService
  ){}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        if (result.matches) {
          this.sidebarService.toggleSidebar();
        }else{
          this.sidebarService.showSidebar()
        }
      });

    this.sidebarService.sidebarVisible$.subscribe(visible => {
      this.isVisible = visible;
    });

    const role = this.authService.getUserRole();

    if(localStorage.getItem("app.token") && role != "ROLE_PRE_USER" && role != "ROLE_USER" ){
      console.log(role)
      this.isLoggedIn = true;
    }
  }
}
