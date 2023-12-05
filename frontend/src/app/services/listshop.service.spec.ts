import { TestBed } from '@angular/core/testing';

import { ListshopService } from './listshop.service';

describe('ListshopService', () => {
  let service: ListshopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListshopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
