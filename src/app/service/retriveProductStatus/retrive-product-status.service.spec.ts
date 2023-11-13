import { TestBed } from '@angular/core/testing';

import { RetriveProductStatusService } from './retrive-product-status.service';

describe('RetriveProductStatusService', () => {
  let service: RetriveProductStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetriveProductStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
