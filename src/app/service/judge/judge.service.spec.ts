import { TestBed } from '@angular/core/testing';

import { JudgeService } from './judge.service';

describe('JudgeService', () => {
  let service: JudgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JudgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
