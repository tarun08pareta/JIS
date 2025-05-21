import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { noauthGuard } from './noauth.guard';

describe('noauthGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
