import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-budget-selection-modal',
  templateUrl: './budget-selection-modal.component.html',
  styleUrls: ['./budget-selection-modal.component.css']
})
export class BudgetSelectionModalComponent implements OnInit {
  @Input() budgets: any[] = [];
  budgetForm: FormGroup;
  selectedBudgetId = Number;
  constructor(public modal: NgbActiveModal, private fb: FormBuilder) {
    this.budgetForm = this.fb.group({
      selectedBudget: [null, Validators.required]
    });
  }

  ngOnInit() {
    console.log('Budgets:', this.budgets);
  }

  onSubmit() {
    this.selectedBudgetId = this.budgetForm.get('selectedBudget')?.value;
    if (this.selectedBudgetId ) {
      // console.log(selectedBudgetId);
      this.modal.close(this.selectedBudgetId);
    }
  }
}
