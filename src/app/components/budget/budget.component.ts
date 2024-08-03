import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
// import { BudgetService } from './budget.service'; // Make sure to create this service to fetch budget data

@Component({
  selector: 'app-budgets',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budgets: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedBudgets: any[] = [];

  constructor(private clientService : ClientService,private authService : AuthService) { }

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    const id = this.authService.getUserId();
    if(id){
      this.clientService.getBudgets(id).subscribe((data: any[]) => {
        this.budgets = data;
        this.updatePaginatedBudgets();
      });
    }
  }

  updatePaginatedBudgets(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBudgets = this.budgets.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedBudgets();
  }

  get totalPages(): number {
    return Math.ceil(this.budgets.length / this.itemsPerPage);
  }
}
