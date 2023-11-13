import { TestBed } from '@angular/core/testing';

import { RetriveRegistrationsService } from './retrive-registrations.service';

describe('RetriveRegistrationsService', () => {
  let service: RetriveRegistrationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetriveRegistrationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
