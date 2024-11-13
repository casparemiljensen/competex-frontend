import { TestBed } from '@angular/core/testing';

import { ExpandableTableService } from './ExpandableTable.service';

describe('ExpandableTableService', () => {
  let service: ExpandableTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpandableTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
