import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTransactionComponent } from './modify-transaction.component';

describe('ModifyTransactionComponent', () => {
  let component: ModifyTransactionComponent;
  let fixture: ComponentFixture<ModifyTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
