import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormCompetitorInfoComponent } from './registration-form-competitor-info.component';

describe('RegistrationFormCompetitorInfoComponent', () => {
  let component: RegistrationFormCompetitorInfoComponent;
  let fixture: ComponentFixture<RegistrationFormCompetitorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationFormCompetitorInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationFormCompetitorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
