import { TestBed } from '@angular/core/testing';

import { EventTestService } from './event.service';

describe('EventTestService', () => {
  let service: EventTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
