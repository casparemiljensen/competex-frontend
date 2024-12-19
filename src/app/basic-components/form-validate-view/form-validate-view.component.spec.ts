import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidateViewComponent } from './form-validate-view.component';

describe('FormValidateViewComponent', () => {
  let component: FormValidateViewComponent;
  let fixture: ComponentFixture<FormValidateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormValidateViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormValidateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
