import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../modals/modal-content/modal-content.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  message: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService,private modalService: NgbModal) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordForm.value;
      this.userService.checkEmail(email).subscribe(exists => {
        console.log(email)
        if (exists) {
          this.userService.checkEmailPendingVerification(email).subscribe(response => {
            if (response.status === 'pending') {
              this.openModal('Email is pending verification. Click below to verify it.',"Pending Verification",'/verify', email)
            }else{
              this.userService.checkTokenExpiry(email).subscribe(response => {
                if(response.isValid){
                  this.openModal('Please check your email we already sent you a reset link.',"Already sent");
                }else{
                  this.userService.sendEmailToken(email).subscribe(response => {
                    if(response.message){
                      this.openModal('Please check the link in your email.',"Reset Link");
                    }
                  })
                }
              })
            }
          });
        } else {
          this.openModal("We didn't recognize your email address.Please sign Up.","You Need To Sign Up")
        }
      });
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
