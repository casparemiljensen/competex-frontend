import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionResultViewComponent } from './competition-result-view.component';

describe('CompetitionResultViewComponent', () => {
  let component: CompetitionResultViewComponent;
  let fixture: ComponentFixture<CompetitionResultViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitionResultViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
