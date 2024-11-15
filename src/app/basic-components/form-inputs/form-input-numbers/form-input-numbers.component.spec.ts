import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputNumbersComponent } from './form-input-numbers.component';

describe('FormInputNumbersComponent', () => {
  let component: FormInputNumbersComponent;
  let fixture: ComponentFixture<FormInputNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormInputNumbersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
