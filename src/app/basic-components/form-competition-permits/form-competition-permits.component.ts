import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-form-competition-permits',
  templateUrl: './form-competition-permits.component.html',
  styleUrl: './form-competition-permits.component.css',
})
export class CompetitionPermitsComponent {
  @Input() control!: FormGroup;
}
