import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
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
  historicalTransactions$!: Observable<any[]>;
  id! : string | null;


  balanceForm: FormGroup;

  constructor(private clientService: ClientService, private fb: FormBuilder, private authService : AuthService) {
    this.balanceForm = this.fb.group({
      futureDate: ['']
    });
  }

  ngOnInit(): void {
    this.id = this.authService.getUserId();
    this.fetchCurrentBalance();
    this.fetchHistoricalTransactions();
  }

  fetchCurrentBalance(): void {
    const userId = 1; // Replace with dynamic user ID
    if(this.id){
      this.currentBalance$ = this.clientService.getBalnce(this.id);
      this.currentPotentialBalance$ = this.clientService.getCurrentPotentialBalance(this.id);
    } 
  }

  fetchPotentialBalance(): void {
    const userId = 1; // Replace with dynamic user ID
    const futureDate = this.balanceForm.get('futureDate')?.value;
    this.potentialBalance$ = this.clientService.getPotentialBalance(userId.toString(), futureDate);
  }

  fetchHistoricalTransactions(): void {
    const userId = 1; // Replace with dynamic user ID
    this.historicalTransactions$ = this.clientService.getStableTransactions(userId.toString());
  }

  onCalculatePotentialBalance(): void {
    this.fetchPotentialBalance();
  }
}
