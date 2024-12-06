import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-competition-round-details',
  templateUrl: './competition-round-details.component.html',
  styleUrl: './competition-round-details.component.css',
})
export class CompetitionRoundDetailsComponent {
  @Output() formSubmit = new EventEmitter<FormGroup>();
  @Output() newRoundAdded = new EventEmitter<void>();
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      fault: ['', [Validators.min(0), Validators.max(20)]],
      time: ['', [Validators.min(0), Validators.max(100)]],
    });
  }
  get faultControl() {
    return this.myForm.get('fault') as FormControl;
  }
  get timeControl() {
    return this.myForm.get('time') as FormControl;
  }

  handleSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form is valid');
      //send formdata back to parent component
      this.formSubmit.emit(this.myForm);
      this.newRoundAdded.emit();
    } else {
      console.log('Form is invalid');
    }
  }
}
