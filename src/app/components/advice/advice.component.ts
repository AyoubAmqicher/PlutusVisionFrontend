import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { FinancialAdvice } from '../../models/financial-advice.model'; // Import your model

@Component({
  selector: 'app-advice-list',
  templateUrl: './advice.component.html', // Corrected to 'advice-list.component.html'
  styleUrls: ['./advice.component.css']
})
export class AdviceListComponent implements OnInit {
  financialAdvices: FinancialAdvice[] = []; // Use your model for advice
  selectedAdvice: FinancialAdvice | null = null; // To store the selected advice for the modal
  currentPage: number = 1;
  totalPages: number = 0; // Assume you will calculate or receive the total pages

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getFinancialAdvices();
  }

  getFinancialAdvices(): void {
    // Uncomment and integrate with your service when available
    /*
    this.financialAdviceService.getFinancialAdvices().subscribe(
      (response: FinancialAdvice[]) => {
        this.financialAdvices = response;
        this.totalPages = this.calculateTotalPages(); // You will need a way to calculate the total pages
      },
      (error) => {
        console.error('Error fetching financial advice:', error);
      }
    );
    */
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.getFinancialAdvices(); // Fetch data based on the new page
  }

  viewAdvice(adviceId: number): void {
    this.router.navigate(['/advice', adviceId]);
  }

  openAdviceDetails(advice: FinancialAdvice, modal: any): void {
    this.selectedAdvice = advice;
    modal.open();
  }

  private calculateTotalPages(): number {
    const itemsPerPage = 10; // Adjust based on your pagination logic
    return Math.ceil(this.financialAdvices.length / itemsPerPage);
  }
}
