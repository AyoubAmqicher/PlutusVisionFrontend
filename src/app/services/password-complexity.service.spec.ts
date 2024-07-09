import { TestBed } from '@angular/core/testing';

import { PasswordComplexityService } from './password-complexity.service';

describe('PasswordComplexityService', () => {
  let service: PasswordComplexityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordComplexityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
