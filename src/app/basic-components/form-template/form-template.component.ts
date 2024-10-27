import { Component, Input, OnInit, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrl: './form-template.component.css'
})
export class FormTemplateComponent implements OnInit {
  @Input() formFields: {[key: string]: any} = {};
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  get nameControl(): FormControl {
    return this.myForm.get('name') as FormControl;
  }
  handleSubmit() {
    if (this.myForm.valid) {
      alert('Form submitted successfully!');
    } else {
      alert('Form is invalid. Please correct the errors.');
    }
  }
}
