import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class NameValidators {
  static validName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const name = control.value;
      if (!name) return null;

      // Check if the name contains only alphabetic characters, spaces, or hyphens
      const validPattern = /^[a-zA-Z\s-]+$/;
      if (!validPattern.test(name)) {
        return { invalidCharacters: true };
      }

      // Check if the length is between 2 and 50 characters
      if (name.length < 2 || name.length > 50) {
        return { invalidLength: true };
      }

      return null;
    };
  }
}
