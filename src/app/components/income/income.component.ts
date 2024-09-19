import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../services/client.service';
import { ModalContentComponent } from '../../modals/modal-content/modal-content.component';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  waitingForConfirmationIncomes: any[] = [];
  upcomingIncomes: any[] = [];

  // Pagination for Waiting for Confirmation
  waitingCurrentPage = 1;
  waitingItemsPerPage = 5;
  waitingTotalPages = 0;

  // Pagination for Other Upcoming Incomes
  upcomingCurrentPage = 1;
  upcomingItemsPerPage = 5;
  upcomingTotalPages = 0;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private modalService: NgbModal,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadIncomes();
  }

  loadIncomes() {
    const id = this.authService.getUserId();
    if (id) {
      this.transactionService.getComingIncomeTransactions(id).subscribe(response => {
        this.waitingForConfirmationIncomes = response;
        this.waitingTotalPages = Math.ceil(response.length / this.waitingItemsPerPage);
      });

      this.transactionService.getComingFutureIncomeTransactions(id).subscribe(response => {
        this.upcomingIncomes = response;
        this.upcomingTotalPages = Math.ceil(response.length / this.upcomingItemsPerPage);
      });
    }
  }

  confirmIncome(incomeId: number) {
    this.transactionService.confirmIncome(incomeId).subscribe(response => {
      this.openModal("Income has been confirmed", "Success");
      this.loadIncomes();
    });
  }

  cancelIncome(id: number) {
    this.clientService.deleteTransaction(id).subscribe(response => {
      this.openModal("Income has been canceled", "Success");
      this.loadIncomes();
    });
  }

  openModal(message: string, title: string, redirectTo: string | null = null, email: string | null = null) {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.redirectTo = redirectTo;
    modalRef.componentInstance.email = email;
  }

  // Methods for Waiting for Confirmation pagination
  getPaginatedWaitingIncomes() {
    const start = (this.waitingCurrentPage - 1) * this.waitingItemsPerPage;
    const end = start + this.waitingItemsPerPage;
    return this.waitingForConfirmationIncomes.slice(start, end);
  }

  changeWaitingPage(page: number) {
    this.waitingCurrentPage = page;
  }

  // Methods for Other Upcoming Incomes pagination
  getPaginatedUpcomingIncomes() {
    const start = (this.upcomingCurrentPage - 1) * this.upcomingItemsPerPage;
    const end = start + this.upcomingItemsPerPage;
    return this.upcomingIncomes.slice(start, end);
  }

  changeUpcomingPage(page: number) {
    this.upcomingCurrentPage = page;
  }
}
