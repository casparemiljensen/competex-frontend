import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableTableComponent } from './ExpandableTable.component';

describe('ExpandableTableComponent', () => {
  let component: ExpandableTableComponent;
  let fixture: ComponentFixture<ExpandableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpandableTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
