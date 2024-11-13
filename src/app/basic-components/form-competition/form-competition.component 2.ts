import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-form-competition',
  templateUrl: './form-competition.component.html',
  styleUrl: './form-competition.component.css',
})
export class CompetitionFormComponent {
  @Input() control!: FormArray;

  constructor(private fb: FormBuilder) {}
  grenOptions = [
    { value: 'lige', viewValue: 'Lige' },
    { value: 'kroget', viewValue: 'Kroget' },
    { value: 'hoejde', viewValue: 'Højdehop' },
    { value: 'laengde', viewValue: 'Længdehop' },
  ];

  klasseOptions = [
    { value: 'let', viewValue: 'Let' },
    { value: 'middelsvaer', viewValue: 'Middelsvær' },
    { value: 'svaer', viewValue: 'Svær' },
    { value: 'elite', viewValue: 'Elite' },
  ];

  addCompetition() {
    const competitionForm = this.fb.group({
      gren: ['', [Validators.required]],
      klasse: ['', [Validators.required]],
      pris: [
        null,
        [
          Validators.required,
          Validators.max(50),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
    this.control.push(competitionForm);
  }
  deleteCompetition(i: number) {
    this.control.removeAt(i);
  }
  getCompetitionControl(index: number, controlName: string) {
    return (this.control.at(index) as FormGroup).get(controlName);
  }

  get parentFormGroup(): FormGroup {
    return this.control.parent as FormGroup;
  }
  getGrenControl(index: number): FormControl {
    return (this.control.at(index) as FormGroup).get('gren') as FormControl;
  }

  getKlasseControl(index: number): FormControl {
    return (this.control.at(index) as FormGroup).get('klasse') as FormControl;
  }
  getPrisControl(index: number): FormControl {
    return (this.control.at(index) as FormGroup).get('pris') as FormControl;
  }
}
