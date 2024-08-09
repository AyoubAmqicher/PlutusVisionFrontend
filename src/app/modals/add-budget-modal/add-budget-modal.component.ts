import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category, CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-budget-modal',
  templateUrl: './add-budget-modal.component.html',
  styleUrl: './add-budget-modal.component.css'
})
export class AddBudgetModalComponent implements OnInit{
  addBudgetForm! : FormGroup;
  categories: Category[] = [];

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder, 
    private categoryService: CategoryService
  ) {}


  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
  }
  
  initializeForm(): void {
    this.addBudgetForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      categoryId: ['', Validators.required],
      period: ['', Validators.required]
    });
  }
  
  loadCategories(): void {
    this.categoryService.getCategoriesByType('EXPENSE').subscribe(categories => {
      this.categories = categories;
    });
  }

  onSubmit(){
    if (this.addBudgetForm.valid) {
      this.modal.close(this.addBudgetForm.value);
    } else {
      this.addBudgetForm.markAllAsTouched();
    }
  }
}
