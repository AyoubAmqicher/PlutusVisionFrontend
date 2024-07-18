// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service'; // Make sure to create this service
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  userSolde = 100; // Example value
  userName = 'John Doe'; // Example value
  notificationCount = 5; // Example value
  isLargeScreen = true;

  constructor(private sidebarService: SidebarService,private breakpointObserver : BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        if (result.matches) {
          this.togglesmalldevice();
        }
      });
  }

  togglesmalldevice(){
    this.isLargeScreen = !this.isLargeScreen;
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
