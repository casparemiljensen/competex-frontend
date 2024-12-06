import { TestBed } from '@angular/core/testing';

import { CompetitionTypeService } from './competition-type.service';

describe('CompetitionTypeService', () => {
  let service: CompetitionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
