import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationSuccessModalComponent } from './verification-success-modal.component';

describe('VerificationSuccessModalComponent', () => {
  let component: VerificationSuccessModalComponent;
  let fixture: ComponentFixture<VerificationSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificationSuccessModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificationSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
