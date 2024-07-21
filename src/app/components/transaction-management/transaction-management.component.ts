import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html',
  styleUrls: ['./transaction-management.component.css']
})
export class TransactionManagementComponent implements OnInit {
  transactionForm!: FormGroup;
  categories: Category[] = [];
  minDate!: string;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01), Validators.pattern(/^\d*\.?\d{0,2}$/)]],
      isStable: [false],
      datePrevu: ['', Validators.required],
      category: ['', Validators.required]
    });

    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;
    this.minDate = `${today.getFullYear()}-${formattedMonth}-${formattedDay}`;

    // Load categories based on default type (if any)
    this.loadCategories(this.transactionForm.get('type')!.value);
    
    // Subscribe to type changes to load the correct categories
    this.transactionForm.get('type')!.valueChanges.subscribe((type) => {
      this.loadCategories(type);
    });
  }

  loadCategories(type: 'EXPENSE' | 'INCOME') {
    if (type) {
      this.categoryService.getCategoriesByType(type).subscribe(categories => {
        this.categories = categories;
        this.transactionForm.controls['category'].setValue(''); // Reset category selection
      });
    }
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      console.log('Transaction saved', this.transactionForm.value);
      // Add your logic to save the transaction here
    } else {
      this.transactionForm.markAllAsTouched();
    }
  }
}
