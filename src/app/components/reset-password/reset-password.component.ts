import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PasswordValidators } from '../../validators/password.validators';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../modals/modal-content/modal-content.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string | null = null;
  message: string | null = null;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private userService : UserService,
    private tokenService : TokenService,
    private modalService: NgbModal
  ){
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required,PasswordValidators.validPassword()]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if(!this.token){
      window.location.href = `/forgot-password`;
    }else{
      this.tokenService.checkTokenExpiry(this.token).subscribe(response => {
        if(!response.isValid){
          window.location.href = `/forgot-password`;
        }
      })
    }
  }

  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const newPassword = formGroup.get('newPassword');
    const confirmPassword = formGroup.get('confirmPassword');
    return newPassword && confirmPassword && newPassword.value === confirmPassword.value ? null : { 'passwordMismatch': true };
  };

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token) {
      const { newPassword } = this.resetPasswordForm.value;
      this.userService.changePassword(this.token, newPassword).subscribe(response => {
        if(response.hasChanged){
          this.openModal(response.message,"Success");
          setTimeout(() => {
          window.location.href = `/signin`;
        }, 5000);
        }else{
          this.openModal(response.message,"Failed");
          setTimeout(() => {
            window.location.href = `/forgot-password`;
          }, 5000);
        }
      });
    }
  }

  togglePasswordVisibility(input: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    input.type = this.passwordVisible ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility(input: HTMLInputElement): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    input.type = this.confirmPasswordVisible ? 'text' : 'password';
  }

  openModal(message: string, title : string, redirectTo: string | null = null, email: string | null = null) {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.redirectTo = redirectTo;
    modalRef.componentInstance.email = email;
  }
}
