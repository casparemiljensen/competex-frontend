import { Component, Input, OnInit, input, DoCheck } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration-forms',
  templateUrl: './registration-forms.component.html',
  styleUrl: './registration-forms.component.css'
})
export class RegistrationFormsComponent {
  @Input() formFields: { [key: string]: any } = {};

  myForm!: FormGroup;
  currentPageIndex: number = 0;

  newForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      mailAddress: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });

    this.newForm = this.fb.group({
      rabbitName:  ['', [Validators.required]],
      competitions: [[], [this.maxSelectionValidator(3)]],
      udenForKlassen: [false],
    })

    this.myForm.valueChanges.subscribe((value) => {
      console.log('Form Value Changed:', value);
    });

    this.newForm.valueChanges.subscribe((value) => {
      console.log('Form Value Changed:', value);
    });
  }

  maxSelectionValidator(max: number) {
    return (control: FormControl) => {
      const value = control.value || [];
      return value.length <= max ? null : { maxSelection: true };
    };
  }

  handleSubmit() {
    if (this.myForm.valid && this.newForm.valid) {
      const formData = { ...this.myForm.value, ...this.newForm.value };
      console.log('Form Submitted:', formData);
    } else {
      console.log('Form is invalid');
      alert('Please correct the errors in the form before submitting.');
      return;
    }
  
    const formData = { ...this.myForm.value, ...this.newForm.value };
  
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
  }
  

  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
  }
}

