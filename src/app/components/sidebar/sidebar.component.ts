// sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userName: string = 'John Doe';
  activeRoute: string = '';
  isVisible = true;

  constructor(private router: Router,private sidebarService : SidebarService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
    
  }

  ngOnInit(): void {
    // Fetch user details from a service or directly from sessionStorage/localStorage
    const user = sessionStorage.getItem('user');
    if (user) {
      this.userName = JSON.parse(user).name;
    }

    this.sidebarService.sidebarVisible$.subscribe(visible => {
      this.isVisible = visible;
    });
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }
}
