import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { eventRespons } from '../../../models/eventRespons';

@Component({
  selector: 'app-registration-form-competitor-info',
  templateUrl: './registration-form-competitor-info.component.html',
  styleUrl: './registration-form-competitor-info.component.css'
})
export class RegistrationFormCompetitorInfoComponent {
  constructor() {}
  isLoading = true;
  @Input() parentForm!: FormGroup;
  @Input() control!: FormGroup;
  @Input() compitionsData: any;


  get competitionsControl(): FormControl {
    return this.control?.get('competitions') as FormControl;
  }
  
  get rabbitNameControl(): FormControl {
    return this.control?.get('rabbitName') as FormControl;
  }
  
  get sliderControl(): FormControl {
    return this.control?.get('udenForKlassen') as FormControl;
  }
  

  ngOnInit(): void {
    // Fetch ExpandableTableData from the service
    if(this.compitionsData)
    {
      this.isLoading = false;
      // console.log(this.compitionsData[0].competitionType[0].name)
      console.log(this.compitionsData)
    }
    else 
    {
      console.log("Error")
    }
  } 

}
