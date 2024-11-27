import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormEventInfoComponent } from './registration-form-event-info.component';

describe('RegistrationFormEventInfoComponent', () => {
  let component: RegistrationFormEventInfoComponent;
  let fixture: ComponentFixture<RegistrationFormEventInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationFormEventInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationFormEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
