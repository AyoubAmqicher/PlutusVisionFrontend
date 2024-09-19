import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../../services/transaction.service';
import { AddBudgetModalComponent } from '../../modals/add-budget-modal/add-budget-modal.component';
import { BudgetService } from '../../services/budget.service';
import { ModalContentComponent } from '../../modals/modal-content/modal-content.component';

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
  openMenuId: number | null = null;


  constructor(private clientService: ClientService, 
    private authService: AuthService,
    private transactionService : TransactionService,
    private modalService: NgbModal,
    private budgetService : BudgetService,
  ) { }

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
    this.transactionService.cancelTransaction(transactionId).subscribe(() => {
      this.transactions = this.transactions.filter(transaction => transaction.id !== transactionId);
      this.loadBudgets();
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

  openAddBudgetModal(): void {
    const modalRef = this.modalService.open(AddBudgetModalComponent);
    modalRef.result.then(result => {
      if (result) {
        const id = this.authService.getUserId();
        if(id){
          this.clientService.getBalnce(id).subscribe( response => {
            if(response.balance < result.amount){
              this.openModal("your balance is insufficient to perform this operation.",
                "Balance Insufficient");
            } else {
              this.budgetService.saveTransaction(result,id).subscribe(re => {
                this.openModal('Budget saved successfully', 'Success');
                this.loadBudgets();
              });
            }
          });
        }
      }
    }, reason => {});
  }

  openModal(message: string, title : string, redirectTo: string | null = null, email: string | null = null) {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.redirectTo = redirectTo;
    modalRef.componentInstance.email = email;
  }

  toggleMenu(budgetId: number): void {
    this.openMenuId = this.openMenuId === budgetId ? null : budgetId;
  }

  isMenuOpen(budgetId: number): boolean {
    return this.openMenuId === budgetId;
  }

  cancelBudget(budgetId: number): void {
    console.log(budgetId);
    this.openMenuId = this.openMenuId === budgetId ? null : budgetId;

    this.budgetService.isBudgetHaveUnconfirmedTransaction(budgetId).subscribe(response => {
      if(response.response){
        this.openModal("You can not cancel this budget it has uncofirmed transactions","Error")
      }else{
        this.budgetService.deleteBudget(budgetId).subscribe(() => {
        this.budgets = this.budgets.filter(budget => budget.id !== budgetId);
        this.updatePaginatedBudgets();
        this.openModal('Budget cancelled successfully', 'Success');
        });
      }
    })
  }
  
}
