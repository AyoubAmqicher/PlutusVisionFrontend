import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class UsernameValidators {
  static validUsername(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const username = control.value;
      if (!username) return null;

      // Check if username contains only alphanumeric characters or underscores
      const validPattern = /^[a-zA-Z0-9_]+$/;
      if (!validPattern.test(username)) {
        return { invalidCharacters: true };
      }

      // Check if the first character is a digit
      const startsWithDigitPattern = /^[0-9]/;
      if (startsWithDigitPattern.test(username)) {
        return { startsWithDigit: true };
      }

      // Check if the length is between 6 and 30 characters
      if (username.length < 6 || username.length > 30) {
        return { invalidLength: true };
      }

      return null;
    };
  }
}
