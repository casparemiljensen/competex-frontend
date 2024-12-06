import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '../../models/location';
import { Organizer } from '../../models/organizer';
import { Member } from '../../models/member';

@Component({
  selector: 'app-form-event-information',
  templateUrl: './form-event-information.component.html',
  styleUrl: './form-event-information.component.css',
})
export class FormEventInformationComponent {
  @Input() parentForm!: FormGroup;
  @Input() locations: Location[] = [];
  @Input() organizers: Member[] = [];

  locationOptions: { value: string; viewValue: string }[] = [];
  organizerOptions: { value: string; viewValue: string }[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['locations'] && this.locations) {
      this.getlocationOptions();
    }
    if (changes['organizers'] && this.organizers) {
      this.getorganizerOptions();
    }
  }

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
  get entryFeeControl(): FormControl {
    return this.parentForm.get('entryFee') as FormControl;
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

  getlocationOptions() {
    this.locationOptions = this.locations.map((location) => {
      return {
        value: location.id,
        viewValue: location.name,
      };
    });
    console.log('locationOptions:', this.locationOptions);
  }
  getorganizerOptions() {
    this.organizerOptions = this.organizers.map((organizer) => {
      return {
        value: organizer.id,
        viewValue: `${organizer.firstName} ${organizer.lastName}`,
      };
    });
    console.log('organizerOptions:', this.organizerOptions);
  }
}
