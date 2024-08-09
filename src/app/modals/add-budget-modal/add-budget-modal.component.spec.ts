import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetModalComponent } from './add-budget-modal.component';

describe('AddBudgetModalComponent', () => {
  let component: AddBudgetModalComponent;
  let fixture: ComponentFixture<AddBudgetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBudgetModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBudgetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
