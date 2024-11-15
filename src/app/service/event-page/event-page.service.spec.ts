import { TestBed } from '@angular/core/testing';

import { EventPageService } from '../event-page/event-page.service';

describe('EventPageService', () => {
  let service: EventPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
