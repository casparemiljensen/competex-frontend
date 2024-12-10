import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionRoundDetailsComponent } from './competition-round-details.component';

describe('CompetitionRoundDetailsComponent', () => {
  let component: CompetitionRoundDetailsComponent;
  let fixture: ComponentFixture<CompetitionRoundDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitionRoundDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionRoundDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
