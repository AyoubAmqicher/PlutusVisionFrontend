import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-modify-transaction',
  templateUrl: './modify-transaction.component.html',
  styleUrls: ['./modify-transaction.component.css']
})
export class ModifyTransactionComponent implements OnInit {
  @Input() transaction: any;
  categories: Category[] = [];
  modifyTransactionForm!: FormGroup;

  constructor(public modal: NgbActiveModal, private fb: FormBuilder, private categoryService: CategoryService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeForm();
    this.patchFormValues();
    this.loadCategories(this.modifyTransactionForm.get('type')!.value);
    this.modifyTransactionForm.get('type')!.valueChanges.subscribe((type) => {
      this.loadCategories(type);
    });
  }

  initializeForm(): void {
    this.modifyTransactionForm = this.fb.group({
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01), Validators.pattern(/^\d*\.?\d{0,2}$/)]],
      date: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  patchFormValues(): void {
    if (this.transaction) {
      this.modifyTransactionForm.patchValue({
        ...this.transaction,
        categoryId: this.transaction.category.id
      });
    }
  }

  

  onSubmit(): void {
    if (this.modifyTransactionForm.valid) {
      this.modal.close(this.modifyTransactionForm.value);
    } else {
      this.modifyTransactionForm.markAllAsTouched();
    }
  }

  loadCategories(type: 'EXPENSE' | 'INCOME') {
    if (type) {
      this.categoryService.getCategoriesByType(type).subscribe(categories => {
        this.categories = categories;
        // Set the default value for category
        if (this.transaction) {
          this.modifyTransactionForm.controls['categoryId'].setValue(this.transaction.category.id);
        }
        this.cdr.detectChanges(); // Explicitly trigger change detection
      });
    } 
  }
}
