import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionPermitsComponent } from './competition-permits.component';

describe('CompetitionPermitsComponent', () => {
  let component: CompetitionPermitsComponent;
  let fixture: ComponentFixture<CompetitionPermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitionPermitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionPermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
