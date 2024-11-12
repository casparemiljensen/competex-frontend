import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionFormComponent } from './form-competition.component';

describe('CompetitionFormComponent', () => {
  let component: CompetitionFormComponent;
  let fixture: ComponentFixture<CompetitionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitionFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompetitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
