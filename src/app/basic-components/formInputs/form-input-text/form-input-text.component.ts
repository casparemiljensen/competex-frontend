import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-input-text',
  templateUrl: './form-input-text.component.html',
  styleUrl: './form-input-text.component.css'
})
export class FormInputTextComponent {
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