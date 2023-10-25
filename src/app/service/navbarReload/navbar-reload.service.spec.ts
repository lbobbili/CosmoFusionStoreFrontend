import { TestBed } from '@angular/core/testing';

import { NavbarReloadService } from './navbar-reload.service';

describe('NavbarReloadService', () => {
  let service: NavbarReloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarReloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
