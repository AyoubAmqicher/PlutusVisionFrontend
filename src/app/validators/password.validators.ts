import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators {

  static validPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { required: true };
      }

      // Password complexity rules
      const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+}{":;'?/>.<,])(?=.{8,})/;
      if (!regex.test(control.value)) {
        return { invalidPassword: true };
      }

      return null;
    };
  }

  static passwordsMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const newPassword = formGroup.get('newPassword')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      if (newPassword !== confirmPassword) {
        return { passwordsMismatch: true };
      }
      return null;
    };
  }
}
