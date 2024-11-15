import { Component, Input, OnInit, input, DoCheck } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-registration-forms',
  templateUrl: './registration-forms.component.html',
  styleUrl: './registration-forms.component.css'
})
export class RegistrationFormsComponent {
  @Input() formFields: { [key: string]: any } = {};

  myForm!: FormGroup;
  currentPageIndex: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      mailAddress: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });

    this.myForm.valueChanges.subscribe((value) => {
      console.log('Form Value Changed:', value);
    });
  }

  get competitionControl(): FormArray {
    return this.myForm.get('competitions') as FormArray;
  }

  get permissionsGroupControl(): FormGroup {
    return this.myForm.get('permissions') as FormGroup;
  }

  handleSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      console.log('Form Submitted:', formData);
    } else {
      console.log('Form is invalid');
      alert('Please correct the errors in the form before submitting.');
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
  }
}

