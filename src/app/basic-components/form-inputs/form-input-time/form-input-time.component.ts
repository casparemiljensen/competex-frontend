import { Component, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-input-time',
  templateUrl: './form-input-time.component.html',
  styleUrl: './form-input-time.component.css'
})
export class FormInputTimeComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() format: string = 'HH:MM'; // Default format

  get showError(): boolean {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }
}
