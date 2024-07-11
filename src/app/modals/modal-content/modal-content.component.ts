import { Component ,Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.css'
})
export class ModalContentComponent {
  @Input() message!: string;
  constructor(public activeModal: NgbActiveModal) {}
  redirectToVerify() {
    window.location.href = '/verify';  // Adjust the URL to your verification page
  }
}
