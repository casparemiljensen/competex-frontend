import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-input-select',
  templateUrl: './form-input-select.component.html',
  styleUrl: './form-input-select.component.css',
})
export class FormInputSelectComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() options: { value: string; viewValue: string }[] = [];

  get showError(): boolean {
    return (
      this.control?.invalid && (this.control?.dirty || this.control?.touched)
    );
  }
}
