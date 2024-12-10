import { TestBed } from '@angular/core/testing';

import { CachePrimerService } from './cache-primer.service';

describe('CachePrimerService', () => {
  let service: CachePrimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachePrimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
