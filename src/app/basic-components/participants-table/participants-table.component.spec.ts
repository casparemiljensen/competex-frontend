import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsTableComponent } from './participants-table.component';

describe('ParticipantsTableComponent', () => {
  let component: ParticipantsTableComponent;
  let fixture: ComponentFixture<ParticipantsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
