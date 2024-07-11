import { Component ,Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.css'
})
export class ModalContentComponent {
  @Input() message!: string;
  @Input() title!: string;
  @Input() redirectTo: string | null = null;
  @Input() email: string | null = null;
  constructor(public activeModal: NgbActiveModal) {}

  redirectToVerify() {
    if (this.redirectTo && this.email) {
      window.location.href = `${this.redirectTo}?email=${encodeURIComponent(this.email)}`;
    }
  }
}
