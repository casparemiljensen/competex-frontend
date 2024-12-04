import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-event-information',
  templateUrl: './form-event-information.component.html',
  styleUrl: './form-event-information.component.css',
})
export class FormEventInformationComponent {
  @Input() parentForm!: FormGroup;
  @Input() locations: { id: string; name: string }[] = [];
  @Input() judges: { id: string; name: string }[] = [];
  @Input() organizers: { id: string; name: string }[] = [];

  // Getter methods to access each form control from the parent form
  get titleControl(): FormControl {
    return this.parentForm.get('title') as FormControl;
  }
  get organizerControl(): FormControl {
    return this.parentForm.get('organizer') as FormControl;
  }
  get locationControl(): FormControl {
    return this.parentForm.get('location') as FormControl;
  }
  get adressControl(): FormControl {
    return this.parentForm.get('adress') as FormControl;
  }
  get postadressControl(): FormControl {
    return this.parentForm.get('postadress') as FormControl;
  }
  get startTimeControl(): FormControl {
    return this.parentForm.get('startTime') as FormControl;
  }
  get startDateControl(): FormControl {
    return this.parentForm.get('startDate') as FormControl;
  }
  get endDateControl(): FormControl {
    return this.parentForm.get('endDate') as FormControl;
  }
  get registrationStartDateControl(): FormControl {
    return this.parentForm.get('registrationStartDate') as FormControl;
  }
  get registrationEndDateControl(): FormControl {
    return this.parentForm.get('registrationEndDate') as FormControl;
  }

  get locationOptions() {
    return this.locations.map((location) => {
      return {
        value: location.id,
        viewValue: location.name,
      };
    });
  }
  get organizerOptions() {
    return this.organizers.map((organizer) => {
      return {
        value: organizer.id,
        viewValue: organizer.name,
      };
    });
  }
}
