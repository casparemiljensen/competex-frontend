import { Component, Input, SimpleChanges } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { Level } from '../../models/enums';

import { CompetitionType } from '../../models/competitionType';

@Component({
  selector: 'app-form-competition',
  templateUrl: './form-competition.component.html',
  styleUrl: './form-competition.component.css',
})
export class CompetitionFormComponent {
  @Input() control!: FormArray;
  @Input() competitionTypes: CompetitionType[] = [];

  constructor(private fb: FormBuilder) {}

  competitionTypeOptions: { value: string; viewValue: string }[] = [];
  levelOptions: { value: string; viewValue: string }[] = [];

  ngOnInit() {
    this.getCompetitionTypeOptions();
    this.getLevelOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['competitionTypes'] && this.competitionTypes) {
      this.getCompetitionTypeOptions();
    }
  }
  addCompetition() {
    const competitionForm = this.fb.group({
      competitionType: ['', [Validators.required]],
      level: ['', [Validators.required]],
      price: [
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
  getCompetitionTypeControl(index: number): FormControl {
    return (this.control.at(index) as FormGroup).get(
      'competitionType'
    ) as FormControl;
  }

  getLevelControl(index: number): FormControl {
    return (this.control.at(index) as FormGroup).get('level') as FormControl;
  }
  getPriceControl(index: number): FormControl {
    return (this.control.at(index) as FormGroup).get('price') as FormControl;
  }

  // Get the options for the competition type dropdown from the competitionTypes array
  getCompetitionTypeOptions() {
    this.competitionTypeOptions = this.competitionTypes.map((data) => {
      return {
        value: data.id,
        viewValue: data.name || '', // Set a default value if data.name is null or undefined
      };
    });
    console.log('competitionTypeOptions:', this.competitionTypeOptions);
  }

  // Get the options for the level dropdown from the Level enum
  getLevelOptions() {
    this.levelOptions = Object.entries(Level)
      .filter(([key, value]) => typeof value === 'number') // Ensure only numeric values are used
      .map(([key, value]) => ({
        value: value.toString(), // Explicitly cast the value to a number
        viewValue: key, // Use string representation for display
      }));

    console.log('Level Options:', this.levelOptions);
  }
}
