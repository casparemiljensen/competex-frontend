import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-validate-view',
  templateUrl: './form-validate-view.component.html',
  styleUrl: './form-validate-view.component.css',
})
export class FormValidateViewComponent {
  @Input() formData: any;

  getViewValue(key: string): string {
    console.log('getViewValue:', key);
    return JSON.parse(key).name;
  }
}
