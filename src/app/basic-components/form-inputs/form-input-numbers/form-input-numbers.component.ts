import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-input-numbers',
  templateUrl: './form-input-numbers.component.html',
  styleUrls: ['./form-input-numbers.component.css']
})
export class FormInputNumbersComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() validationMessage: string = '';

  constructor() {
    if (!this.control) {
      this.control = new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{8}$')
      ]);
    }
  }

  get showError(): boolean {
    return (
      this.control?.invalid && (this.control?.dirty || this.control?.touched)
    );
  }

  get numberValue(): number {
    return this.control?.value ? parseFloat(this.control?.value) : NaN;
  }
}
