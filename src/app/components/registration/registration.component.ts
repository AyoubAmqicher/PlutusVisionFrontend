import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidatorService } from '../../services/username-validator.service';
import { UsernameValidators } from '../../validators/username.validators';
import { NameValidators } from '../../validators/name.validators';
import { PasswordValidators } from '../../validators/password.validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'] // Ensure this is 'styleUrls' and not 'styleUrl'
})
export class RegistrationComponent {
  signupForm: FormGroup;
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private usernameValidator : UsernameValidatorService) {
    this.signupForm = this.fb.group({
      username: ['', {
        validators: [Validators.required,UsernameValidators.validUsername()],
        asyncValidators: [this.usernameValidator.checkUsername()],
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
      // Handle form submission
      console.log(this.signupForm.value);
    } else {
      // Mark all controls as touched to trigger validation messages
      this.signupForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility(input: HTMLInputElement) {
    this.passwordVisible = !this.passwordVisible;
    input.type = this.passwordVisible ? 'text' : 'password';
  }
}
