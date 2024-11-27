import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsOverviewPageComponent } from './results-overview-page.component';

describe('ResultsOverviewPageComponent', () => {
  let component: ResultsOverviewPageComponent;
  let fixture: ComponentFixture<ResultsOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsOverviewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
