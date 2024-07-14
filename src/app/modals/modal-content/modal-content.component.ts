import { Component ,Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';


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
  constructor(public activeModal: NgbActiveModal, private userService : UserService) {}

  redirectToVerify() {
    if (this.redirectTo && this.email) {
      window.location.href = `${this.redirectTo}?email=${encodeURIComponent(this.email)}`;
    }
  }

  resend(){
    if(this.email){
      this.userService.generateVerificationCode(this.email).subscribe(response => {
        if (response.isGenerated) {
          console.log('New verification code generated successfully.');
          this.activeModal.close('Close click');
        } else {
          console.error('Failed to generate new verification code.');
        }
      });
    }
  }
}
