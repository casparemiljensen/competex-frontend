import { Component, Input, OnInit, input, DoCheck } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrl: './form-template.component.css',
})
export class FormTemplateComponent implements OnInit {
  @Input() formFields: { [key: string]: any } = {};
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      organizer: ['', [Validators.required]],
      location: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      postadress: ['', [Validators.required]],
      startTime: [
        '',
        [
          Validators.required,
          Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$'),
        ],
      ],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      registrationStartDate: ['', [Validators.required]],
      registrationEndDate: ['', [Validators.required]],
      competitions: this.fb.array([]),
      permissions: this.fb.group({
        udenForKlassen: [true],
        veteranKaniner: [true],
        eftertilmelding: [true],
        traeningsstaevner: [false],
      }),
    });

    this.myForm.valueChanges.subscribe(() => {
      this.myForm.updateValueAndValidity();
    });
  }

  get competitionControl(): FormArray {
    return this.myForm.get('competitions') as FormArray;
  }
  //Getter methods for form controls, used in the html template to send the form control to the form-input components.
  get titleControl(): FormControl {
    return this.myForm.get('title') as FormControl;
  }
  get organizerControl(): FormControl {
    return this.myForm.get('organizer') as FormControl;
  }
  get locationControl(): FormControl {
    return this.myForm.get('location') as FormControl;
  }
  get adressControl(): FormControl {
    return this.myForm.get('adress') as FormControl;
  }
  get postadressControl(): FormControl {
    return this.myForm.get('postadress') as FormControl;
  }
  get startTimeControl(): FormControl {
    return this.myForm.get('startTime') as FormControl;
  }
  get startDateControl(): FormControl {
    return this.myForm.get('startDate') as FormControl;
  }
  get endDateControl(): FormControl {
    return this.myForm.get('endDate') as FormControl;
  }
  get registrationStartDateControl(): FormControl {
    return this.myForm.get('registrationStartDate') as FormControl;
  }
  get registrationEndDateControl(): FormControl {
    return this.myForm.get('registrationEndDate') as FormControl;
  }
  get permissionsGroupControl(): FormGroup {
    return this.myForm.get('permissions') as FormGroup;
  }

  handleSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value; // Collect the form data
      console.log('Form Submitted:', formData);
      // You can also send the form data to a server here using an API
      // Example: this.http.post('api-url', formData).subscribe(response => { ... });
    } else {
      console.log('Form is invalid');
      alert('Please correct the errors in the form before submitting.');
    }
  }

  ngDoCheck(): void {
    console.log('Form Valid:', this.myForm.valid);
    console.log('Competitions Control Valid:', this.competitionControl.valid);
    console.log('Competitions Control Value:', this.competitionControl.value);
  }
}
