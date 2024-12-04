import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration-forms',
  templateUrl: './registration-forms.component.html',
  styleUrls: ['./registration-forms.component.css']
})
export class RegistrationFormsComponent {
  @Input() formFields: { [key: string]: any } = {};
  @Input() compitionsData: any;

  myForm!: FormGroup;
  currentPageIndex: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      mailAddress: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      rabbits: this.fb.array([])
    });

    // Add the first set of controls by default
    this.addRabbit();
  }

  // Getter for the FormArray
  get rabbitsControls(): FormArray<FormGroup> {
  return this.myForm.get('rabbits') as FormArray<FormGroup>;
}


  // Method to add a new set of controls
  addRabbit(): void {
    const rabbitForm = this.fb.group({
      rabbitName: ['', [Validators.required]],
      competitions: [[], [this.maxSelectionValidator(3)]],
      udenForKlassen: [false],
    });

    this.rabbitsControls.push(rabbitForm);
  }

  // Method to remove a specific rabbit form
  removeRabbit(index: number): void {
    this.rabbitsControls.removeAt(index);
  }

  maxSelectionValidator(max: number) {
    return (control: FormControl) => {
      const value = control.value || [];
      return value.length <= max ? null : { maxSelection: true };
    };
  }

  handleSubmit(): void {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      console.log('Form Submitted:', formData);

      // Simulate sending to the database
      this.http.post('/api/registrations', formData).subscribe(
        (response) => {
          console.log('Data submitted successfully:', response);
          alert('Registration submitted successfully!');
        },
        (error) => {
          console.error('Error submitting data:', error);
          alert('An error occurred while submitting the registration.');
        }
      );
    } else {
      console.log('Form is invalid');
      alert('Please correct the errors in the form before submitting.');
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
  }
}
