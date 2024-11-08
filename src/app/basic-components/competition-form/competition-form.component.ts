import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-competition-form',
  templateUrl: './competition-form.component.html',
  styleUrl: './competition-form.component.css',
})
export class CompetitionFormComponent {
  @Input() control!: FormArray;

  constructor(private fb: FormBuilder) {}

  addCompetition() {
    const competitionForm = this.fb.group({
      gren: ['', [Validators.required]],
      klasse: ['', [Validators.required]],
      pris: [null, [Validators.required, Validators.max(50)]],
    });
    this.control.push(competitionForm);
  }
  deleteCompetition(i: number) {
    this.control.removeAt(i);
  }
  getCompetitionControl(index: number, controlName: string) {
    return (this.control.at(index) as FormGroup).get(controlName);
  }
}
