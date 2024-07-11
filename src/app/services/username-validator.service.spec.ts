import { TestBed } from '@angular/core/testing';

import { UsernameValidatorService } from './user.service';

describe('UsernameValidatorService', () => {
  let service: UsernameValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsernameValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
