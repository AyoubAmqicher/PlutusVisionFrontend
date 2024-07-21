import { Component, OnInit } from '@angular/core';
import { SidebarService } from './services/sidebar.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


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
    private breakpointObserver: BreakpointObserver
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

    if(localStorage.getItem("app.token")){
      this.isLoggedIn = true;
    }
  }
}
