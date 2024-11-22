import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-competition-result-view',
  templateUrl: './competition-result-view.component.html',
  styleUrl: './competition-result-view.component.css',
})
export class CompetitionResultViewComponent {
  resultForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resultForm = this.fb.group({
      fault: ['', [Validators.required, Validators.min(0), Validators.max(14)]],
      time: ['', [Validators.required]],
      correction: ['', [Validators.required]],
      adv: [false],
      disq: [false],
      trukket: [false],
    });

    this.resultForm.get('disq')?.valueChanges.subscribe((value) => {
      this.updateFieldStatus(value);
    });

    this.resultForm.get('trukket')?.valueChanges.subscribe((value) => {
      this.updateFieldStatus(value);
    });
  }

  editParticipant(): void {
    // Add logic to handle participant editing
    console.log('Edit participant clicked');
    alert('Edit participant clicked');
  }

  updateFieldStatus(isChecked: boolean): void {
    if (isChecked) {
      this.resultForm.get('adv')?.disable();
      this.resultForm.get('fault')?.disable();
      this.resultForm.get('time')?.disable();
      this.resultForm.get('correction')?.disable();
    } else {
      !this.resultForm.get('disq')?.value &&
        !this.resultForm.get('trukket')?.value;
      this.resultForm.get('adv')?.enable();
      this.resultForm.get('fault')?.enable();
      this.resultForm.get('time')?.enable();
      this.resultForm.get('correction')?.enable();
    }
  }

  handleSubmit() {
    if (this.resultForm.valid) {
      const formData = this.resultForm.value; // Collect the form data
      console.log('Form Submitted:', formData);
      // You can also send the form data to a server here using an API
      // Example: this.http.post('api-url', formData).subscribe(response => { ... });
    } else {
      console.log('Form is invalid');
      alert('Please correct the errors in the form before submitting.');
    }
  }
}
