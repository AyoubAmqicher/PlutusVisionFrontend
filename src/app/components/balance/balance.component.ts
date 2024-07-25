import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  currentBalance$!: Observable<{ balance: number }>;
  potentialBalance$!: Observable<{ potentialBalance: number }>;
  currentPotentialBalance$!: Observable<{ currentPotentialBalance: number }>;
  historicalTransactions: any[] = [];
  paginatedTransactions: any[] = [];
  id!: string | null;
  balanceForm: FormGroup;
  dateForm: FormGroup;
  pageSize: number = 5;
  currentPage: number = 1;
  totalTransactions: number = 0;
  sortDirection: string = 'desc';
  minDate!: string;

  constructor(private clientService: ClientService, private fb: FormBuilder, private authService: AuthService) {
    this.dateForm = this.fb.group({
      futureDate: ['',[Validators.required]]
    });

    this.balanceForm = this.fb.group({
      newBalance: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = this.authService.getUserId();
    this.fetchCurrentBalance();
    this.fetchHistoricalTransactions();
    this.setMinDate();
  }

  fetchCurrentBalance(): void {
    if (this.id) {
      this.currentBalance$ = this.clientService.getBalnce(this.id);
      this.currentPotentialBalance$ = this.clientService.getCurrentPotentialBalance(this.id);
    }
  }

  fetchHistoricalTransactions(): void {
    if (this.id) {
      this.clientService.getConfirmedTransactions(this.id).subscribe(transactions => {
        this.historicalTransactions = transactions;
        this.totalTransactions = transactions.length;
        this.paginateTransactions();
      });
    }
  }

  fetchPotentialBalance(): void {
    if (this.id) {
      const futureDate = this.dateForm.get('futureDate')?.value;
      this.potentialBalance$ = this.clientService.getPotentialBalance(this.id, futureDate);
    }
  }

  onCalculatePotentialBalance(): void {
    this.fetchPotentialBalance();
  }

  setMinDate(): void {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;
    this.minDate = `${today.getFullYear()}-${formattedMonth}-${formattedDay}`;
  }

  paginateTransactions(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedTransactions = this.historicalTransactions
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      })
      .slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.paginateTransactions();
  }

  changeSortDirection(direction: string): void {
    this.sortDirection = direction;
    this.paginateTransactions();
  }

  onModifyBalance(): void {
    if(this.id){
      const newBalance = this.balanceForm.get('newBalance')?.value;
      this.clientService.updateBalance(this.id, newBalance).subscribe(() => {
        this.fetchCurrentBalance();
        this.fetchPotentialBalance();
      });
    }
  }
}
