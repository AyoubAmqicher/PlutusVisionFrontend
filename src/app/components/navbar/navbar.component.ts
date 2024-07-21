// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service'; // Make sure to create this service
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  userSolde = 0.0; // Example value
  userName = ''; // Example value
  notificationCount = 5; // Example value
  isLargeScreen = true;
  dropdownOpen = false;


  constructor(
    private sidebarService: SidebarService,
    private breakpointObserver : BreakpointObserver,
    private clientService : ClientService,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        if (result.matches) {
          this.togglesmalldevice();
        }else{
          this.isLargeScreen = true;
        }
      });
    if(id){
      this.clientService.getFullName(id).subscribe(response => {
        console.log(response.fullName)
        this.userName = response.fullName;
      });

      this.clientService.getBalnce(id).subscribe(response => {
        console.log(response.balance)
        this.userSolde = response.balance;
      });
    }
  }

  togglesmalldevice(){
    this.isLargeScreen = !this.isLargeScreen;
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(){
    this.authService.logout();
  }
}
