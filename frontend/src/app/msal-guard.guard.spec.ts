import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { msalGuardGuard } from './msal-guard.guard';

describe('msalGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => msalGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
