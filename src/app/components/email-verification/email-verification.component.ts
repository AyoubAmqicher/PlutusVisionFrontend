import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../modals/modal-content/modal-content.component';
import { ActivatedRoute } from '@angular/router';
import { sixDigitCodeValidator } from '../../validators/verfication-code.validators';
import { VerificationSuccessModalComponent } from '../../modals/verification-success-modal/verification-success-modal.component';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'] // Ensure this is 'styleUrls' and not 'styleUrl'
})
export class EmailVerificationComponent implements OnInit{
  verifyEmailForm: FormGroup;

  constructor(private fb: FormBuilder, private route : ActivatedRoute,private userService : UserService,private modalService: NgbModal) {
    this.verifyEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      verificationCode: ['', [Validators.required,sixDigitCodeValidator()]]
    });
  }

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
      this.verifyEmailForm.patchValue({ email });
    }
  }

  onSubmit() {
    if (this.verifyEmailForm.valid) {
      const { email, verificationCode } = this.verifyEmailForm.value;
      this.userService.checkEmail(email).subscribe(exists => {
        console.log(email)
        if (exists) {
          this.userService.checkEmailPendingVerification(email).subscribe(response => {
            if (response.status === 'pending') {
              this.userService.checkVerificationCodeExpiry(email).subscribe(expiryResponse => {
                if (expiryResponse.isExpired) {
                  this.openModal(expiryResponse.message, "Verification Code Expired",null, email);
                } else {
                  this.userService.verifyCode(email, verificationCode).subscribe(response => {
                    if (response.isVerified) {
                      const modalRef = this.modalService.open(VerificationSuccessModalComponent);
                      modalRef.componentInstance.title = 'Verification Successful';
                      modalRef.componentInstance.message = 'Your account has been verified. You will be redirected to the login page.';
                    } else {
                      this.openModal("Verification failed, please try again.", "Wrong Code");
                      console.error('Verification failed:', response.message);
                    }
                  });
                }
              });
            } else {
              this.openModal('Email already verified. Please Up or Sign In.',"Account Already Verified");
            }
          });
        } else {
          this.openModal("We didn't recognize you email address.Please sign Up.","You Need To Sign Up")
        }
      });
    } else {
      this.verifyEmailForm.markAllAsTouched();
    }
  }

  openModal(message: string, title : string, redirectTo: string | null = null, email: string | null = null) {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.redirectTo = redirectTo;
    modalRef.componentInstance.email = email;
  }
}
