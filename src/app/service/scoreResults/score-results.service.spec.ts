import { TestBed } from '@angular/core/testing';

import { ScoreResultsService } from './score-results.service';

describe('ScoreResultsService', () => {
  let service: ScoreResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
