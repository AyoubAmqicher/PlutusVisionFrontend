import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionManagementComponent } from './transaction-management.component';

describe('TransactionManagementComponent', () => {
  let component: TransactionManagementComponent;
  let fixture: ComponentFixture<TransactionManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
