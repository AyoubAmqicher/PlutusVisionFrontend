// sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarVisible = new BehaviorSubject<boolean>(true);
  sidebarVisible$ = this.sidebarVisible.asObservable();

  toggleSidebar(): void {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }

  hideSidebar(){
    this.sidebarVisible.next(false);
  }

  showSidebar(){
    this.sidebarVisible.next(true);
  }
}
