import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-competition-permits',
  templateUrl: './competition-permits.component.html',
  styleUrl: './competition-permits.component.css'
})
export class CompetitionPermitsComponent {
  @Input() control!: FormGroup;
}