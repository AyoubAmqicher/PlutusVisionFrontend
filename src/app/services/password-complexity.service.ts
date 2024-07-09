import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordComplexityService {

  calculateComplexity(password: string): number {
    if (!password) {
      return 0;
    }

    let complexity = 0;

    // Increase complexity for length
    complexity += Math.min(6, password.length) * 10;

    // Increase complexity for variety of characters
    const uniqueChars = new Set(password).size;
    complexity += Math.min(10, uniqueChars) * 5;

    // Check for the presence of various character types
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[@$!%*?&]/.test(password);

    const varietyBonus = [hasLowerCase, hasUpperCase, hasNumbers, hasSpecialChars].filter(Boolean).length;
    complexity += varietyBonus * 10;

    // Ensure complexity is capped at 100
    return Math.min(100, complexity);
  }
}
