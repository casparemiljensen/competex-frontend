import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventPageService } from '../../../service/event-page/event-page.service';

@Component({
  selector: 'app-registration-form-competitor-info',
  templateUrl: './registration-form-competitor-info.component.html',
  styleUrl: './registration-form-competitor-info.component.css'
})
export class RegistrationFormCompetitorInfoComponent {
  constructor(private eventPageService: EventPageService) {}
  ExpandableTableData: any[] = [];
  isLoading = true;
  @Input() parentForm!: FormGroup;
  @Input() control!: FormGroup;


  get competitionsControl(): FormControl {
    return this.parentForm.get('competitions') as FormControl;
  }
  

  get rabbitNameControl(): FormControl {
    return this.parentForm.get('rabbitName') as FormControl;
  }

  get sliderControl(): FormControl {
    return this.parentForm.get('sliderValue') as FormControl;
  }

  ngOnInit(): void {
    // Fetch ExpandableTableData from the service
    this.eventPageService.getExpandableTables().subscribe({
      next: (data) => {
        this.ExpandableTableData = data; // Populate dropdown options
        this.isLoading = false; // Loading complete
      },
      error: (err) => {
        console.error('Error fetching expandable table data:', err);
        this.isLoading = false;
      }
    });
  } 
}
