import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration-form-event-info',
  templateUrl: './registration-form-event-info.component.html',
  styleUrl: './registration-form-event-info.component.css'
})
export class RegistrationFormEventInfoComponent {
  @Input() parentForm!: FormGroup;

  // Getter methods to access each form control from the parent form
  get idControl(): FormControl {
    return this.parentForm.get('id') as FormControl;
  }
  get firstNameControl(): FormControl {
    return this.parentForm.get('firstName') as FormControl;
  }
  get lastNameControl(): FormControl {
    return this.parentForm.get('lastName') as FormControl;
  }
  get birthdayControl(): FormControl {
    return this.parentForm.get('birthday') as FormControl;
  }
  get mailAddressControl(): FormControl {
    return this.parentForm.get('mailAddress') as FormControl;
  }
  get phoneNumberControl(): FormControl {
    return this.parentForm.get('phoneNumber') as FormControl;
  }
}
