import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { eventRespons } from '../../../models/eventRespons';
import { entityService } from '../../../service/entity/entity.service';

@Component({
  selector: 'app-registration-form-competitor-info',
  templateUrl: './registration-form-competitor-info.component.html',
  styleUrl: './registration-form-competitor-info.component.css',
})
export class RegistrationFormCompetitorInfoComponent {
  isLoading = true;
  @Input() parentForm!: FormGroup;
  @Input() control!: FormGroup;
  @Input() competitionsData: any;

  entityOptions: { value: string; viewValue: string }[] = [];

  constructor(private entityService: entityService) {}
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
    if (this.competitionsData) {
      this.isLoading = false;
      // console.log(this.compitionsData[0].competitionType[0].name)
      console.log(this.competitionsData);
    } else {
      console.log('Error');
    }
    this.getEntityOptions();
  }

  getEntityOptions(): void {
    this.entityService.getEntities().subscribe((data) => {
      this.entityOptions = data.map((entity) => ({
        value: JSON.stringify({ id: entity.id, name: entity.name || '' }),
        viewValue: entity.name,
      }));
    });
  }
}
