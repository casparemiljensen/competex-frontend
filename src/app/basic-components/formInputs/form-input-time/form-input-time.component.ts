import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-input-time',
  templateUrl: './form-input-time.component.html',
  styleUrl: './form-input-time.component.css'
})
export class FormInputTimeComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() format: string = 'HH:MM'; // Default format

  ngOnInit(): void {
    // Define a regex pattern based on the format
    const pattern = this.getPatternForFormat(this.format);
    this.control.setValidators([Validators.required, Validators.pattern(pattern)]);
  }

  get showError(): boolean {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  getPatternForFormat(format: string): string {
    switch (format) {
      case 'HH:MM':
        return '^([0-1][0-9]|2[0-3]):[0-5][0-9]$';
      case 'HH MM SS':
        return '^([0-1][0-9]|2[0-3])\s[0-5][0-9]\s[0-5][0-9]$';
      case 'HH MM':
        return '^([0-1][0-9]|2[0-3])\s[0-5][0-9]$';
      default:
        return '^([0-1][0-9]|2[0-3]):[0-5][0-9]$';
    }
  }
}