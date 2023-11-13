import { TestBed } from '@angular/core/testing';

import { SubmitProductsService } from './submit-products.service';

describe('SubmitProductsService', () => {
  let service: SubmitProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
