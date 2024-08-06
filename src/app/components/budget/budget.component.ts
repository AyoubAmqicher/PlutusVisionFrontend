import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../../services/transaction.service';

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
  selectedBudget: any = null;
  transactions: any[] = [];

  constructor(private clientService: ClientService, 
    private authService: AuthService,
    private transactionService : TransactionService,
    private modalService: NgbModal) { }

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

  openBudgetDetails(budget: any, content: any): void {
    this.selectedBudget = budget;
    this.loadTransactions(budget.id);
    this.modalService.open(content);
  }

  loadTransactions(budgetId: number): void {
    // Uncomment and update with actual service method
    this.transactionService.getTransactionsByBudgetId(budgetId).subscribe((transactions: any[]) => {
      this.transactions = transactions;
    });
  }

  cancelTransaction(transactionId: number): void {
    // Uncomment and update with actual service method
    this.transactionService.cancelTransaction(transactionId).subscribe(() => {
      this.transactions = this.transactions.filter(transaction => transaction.id !== transactionId);
    });
  }

  calculateExpectedFinishDate(createdAt: string, period: string): Date {
    const createdDate = new Date(createdAt);
    let expectedFinishDate = new Date(createdDate);

    switch(period) {
      case 'WEEK':
        expectedFinishDate.setDate(createdDate.getDate() + 7);
        break;
      case 'MONTH':
        expectedFinishDate.setMonth(createdDate.getMonth() + 1);
        break;
      case 'YEAR':
        expectedFinishDate.setFullYear(createdDate.getFullYear() + 1);
        break;
    }

    return expectedFinishDate;
  }
}
