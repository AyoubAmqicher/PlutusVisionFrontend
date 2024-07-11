import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../modals/modal-content/modal-content.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'] // Ensure this is 'styleUrls' and not 'styleUrl'
})
export class EmailVerificationComponent implements OnInit{
  verifyEmailForm: FormGroup;

  constructor(private fb: FormBuilder, private route : ActivatedRoute) {
    this.verifyEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      verificationCode: ['', Validators.required]
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
      // this.userService.verifyEmail(email, verificationCode).subscribe(response => {
      //   console.log('Email verified successfully:', response);
      //   this.openModal('Email verified successfully.');
      // }, error => {
      //   console.error('Error verifying email:', error);
      //   this.openModal('Error verifying email. Please try again.');
      // });
    } else {
      this.verifyEmailForm.markAllAsTouched();
    }
  }
}
