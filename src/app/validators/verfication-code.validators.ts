import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function sixDigitCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^\d{6}$/.test(control.value);
    return valid ? null : { invalidCode: true };
  };
}
