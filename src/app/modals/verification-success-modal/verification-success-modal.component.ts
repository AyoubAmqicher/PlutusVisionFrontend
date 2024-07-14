import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-verification-success-modal',
  templateUrl: './verification-success-modal.component.html',
  styleUrls: ['./verification-success-modal.component.css']
})
export class VerificationSuccessModalComponent {
  @Input() title!: string;
  @Input() message!: string;

  constructor(public activeModal: NgbActiveModal) { }

  redirectToLogin() {
    window.location.href = '/login';
  }
}
