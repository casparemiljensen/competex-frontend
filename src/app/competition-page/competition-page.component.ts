import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-competition-page',
  templateUrl: './competition-page.component.html',
  styleUrl: './competition-page.component.css',
})
export class CompetitionPageComponent {
  myForm!: FormGroup;
  detailsSubmitted = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      dommer: ['', [Validators.required]],
      aspirant: ['', []],
      bedmetode: ['', [Validators.required]],
    });
  }

  participants = [
    { name: 'Kanin 1' },
    { name: 'Kanin 2' },
    { name: 'Kanin 3' },
  ];

  bedMetodeOptions = [
    { value: 'd1', viewValue: 'D1' },
    { value: 'c1', viewValue: 'C1' },
    { value: 'd2', viewValue: 'D2' },
    { value: 'c2', viewValue: 'C2' },
  ];

  get dommerControl(): FormControl {
    return this.myForm.get('dommer') as FormControl;
  }
  get aspirantControl(): FormControl {
    return this.myForm.get('aspirant') as FormControl;
  }
  get bedMetodeControl(): FormControl {
    return this.myForm.get('bedmetode') as FormControl;
  }

  handleSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value; // Collect the form data
      this.detailsSubmitted = true;
      console.log('Form Submitted:', formData);
      // You can also send the form data to a server here using an API
      // Example: this.http.post('api-url', formData).subscribe(response => { ... });
    } else {
      console.log('Form is invalid');
      alert('Please correct the errors in the form before submitting.');
    }
  }

  handleParticipantChange(selectedIndex: number): void {
    console.log('Selected Participant Index:', selectedIndex);
  }
}
