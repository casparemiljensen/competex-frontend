import { TestBed } from '@angular/core/testing';

import { OfflineQueueService } from './offline-queue.service';

describe('OfflineQueueService', () => {
  let service: OfflineQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
