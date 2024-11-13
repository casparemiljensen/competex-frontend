import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputDateComponent } from './form-input-date.component';

describe('FormInputDateComponent', () => {
  let component: FormInputDateComponent;
  let fixture: ComponentFixture<FormInputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormInputDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
