import { Component ,Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { lastValueFrom } from 'rxjs';
import { LoadingService } from '../../services/loading.service';


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
  constructor(public activeModal: NgbActiveModal, private userService : UserService,
    private loadingService : LoadingService) {}

  redirectToVerify() {
    if (this.redirectTo && this.email) {
      window.location.href = `${this.redirectTo}?email=${encodeURIComponent(this.email)}`;
    }
  }

  resend(){
    if(this.email){
      (async () => {
        try {
          const response = await lastValueFrom(this.userService.generateVerificationCode(this.email!));
          console.log('New verification code generated successfully.');
        } catch (error) {
          console.error('Failed to generate new verification code.');
        }
      })();
      this.activeModal.close('Close click');
      this.loadingService.hideLoadingSpinner();
    }
  }

  signIN(){
    window.location.href = `/signUp`;
  }
}
