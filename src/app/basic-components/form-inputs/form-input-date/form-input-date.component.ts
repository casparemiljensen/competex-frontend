import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-input-date',
  templateUrl: './form-input-date.component.html',
  styleUrl: './form-input-date.component.css'
})
export class FormInputDateComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;

  // @Input() placeholder: string = '';
  // @Input() validationRegex: string = '';
  // @Input() validationMessage: string = '';
  //control: FormControl = new FormControl('', [Validators.required]);

  get showError(): boolean {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }
}
