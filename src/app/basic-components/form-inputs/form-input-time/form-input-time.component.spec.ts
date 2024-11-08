import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputTimeComponent } from './form-input-time.component';

describe('FormInputTimeComponent', () => {
  let component: FormInputTimeComponent;
  let fixture: ComponentFixture<FormInputTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormInputTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
