import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  myForm!: FormGroup;

  constructor(private fb: FormBuilder ){}

  ngOnInit(): void {

    this.myForm = this.fb.group({
      title: ['',[
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]],
      competition: this.fb.array([]),
      agree: [false,[
        Validators.requiredTrue
      ]],
    })

    this.myForm.valueChanges.subscribe(console.log)
  }

  addCompetition(){
    const competition = this.fb.group({
      gren:['Lige bane',[
        Validators.required
      ]],
      klasse:['',[
        Validators.required
      ]],
      pris: [null,[
        Validators.required, Validators.max(50)
      ]],
    })
    this.competitionForms.push(competition)
  }

  deleteCompetition(i: number){
    this.competitionForms.removeAt(i)
  }

  get title() {
    return this.myForm.get('title');
  }

  get competitionForms(){
    return this.myForm.get('competition') as FormArray
  }

  getCompetitionControl(index: number, controlName: string) {
    return (this.competitionForms.at(index) as FormGroup).get(controlName);
  }

  handleSubmit() {
    alert(
      this.myForm + 'Form is sumbitted'
    );
  }
}