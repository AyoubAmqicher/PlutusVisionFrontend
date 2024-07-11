import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UsernameValidators } from '../../validators/username.validators';
import { NameValidators } from '../../validators/name.validators';
import { PasswordValidators } from '../../validators/password.validators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../modals/modal-content/modal-content.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'] // Ensure this is 'styleUrls' and not 'styleUrl'
})
export class RegistrationComponent {
  signupForm: FormGroup;
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private userService : UserService,private modalService: NgbModal) {
    this.signupForm = this.fb.group({
      username: ['', {
        validators: [Validators.required,UsernameValidators.validUsername()],
        asyncValidators: [this.userService.checkUsername()],
        updateOn: 'blur'
      }],
      firstName: ['', [Validators.required,NameValidators.validName()]],
      lastName: ['', [Validators.required,NameValidators.validName()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, PasswordValidators.validPassword()]],
      role: ['personnel', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const {  email } = this.signupForm.value;
      this.userService.checkEmail(email).subscribe(exists => {
        console.log(email)
        if (exists) {
          this.userService.checkEmailPendingVerification(email).subscribe(response => {
            if (response.status === 'pending') {
              this.openModal('Email is pending verification. Click here to verify it.');
            } else {
              this.openModal('Email is already taken. Please use another email or log in.');
              console.log(this.signupForm.value);
            }
          });
        } else {
          // Handle form submission
          console.log(this.signupForm.value);
        }
      });    } else {
      // Mark all controls as touched to trigger validation messages
      this.signupForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility(input: HTMLInputElement) {
    this.passwordVisible = !this.passwordVisible;
    input.type = this.passwordVisible ? 'text' : 'password';
  }

  openModal(message: string) {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.message = message;
  }
}
