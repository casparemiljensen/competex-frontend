import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEventInformationComponent } from './form-event-information.component';

describe('FormEventInformationComponent', () => {
  let component: FormEventInformationComponent;
  let fixture: ComponentFixture<FormEventInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormEventInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormEventInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
