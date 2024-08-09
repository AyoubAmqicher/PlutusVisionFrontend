import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSelectionModalComponent } from './budget-selection-modal.component';

describe('BudgetSelectionModalComponent', () => {
  let component: BudgetSelectionModalComponent;
  let fixture: ComponentFixture<BudgetSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetSelectionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
