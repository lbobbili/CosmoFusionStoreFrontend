import { TestBed } from '@angular/core/testing';

import { UpdateRegistrationStatusService } from './update-registration-status.service';

describe('UpdateRegistrationStatusService', () => {
  let service: UpdateRegistrationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateRegistrationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
