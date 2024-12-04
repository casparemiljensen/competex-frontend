import { Component, Input, OnInit, input, DoCheck } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { eventRequest } from '../../models/eventRequest';
import { EventService } from '../../service/eventTest/event-test.service';
import { CompetitionService } from '../../service/Competition/competition.service';
import { JudgeService } from '../../service/judge/judge.service';
import { Judge } from '../../models/judge';
import { LocationService } from '../../service/location/location.service';
import { Location } from '../../models/location';
import { CompetitionRequest } from '../../models/competitionRequest';
@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrl: './form-template.component.css',
})
export class FormTemplateComponent implements OnInit {
  @Input() formFields: { [key: string]: any } = {};

  myForm!: FormGroup;
  currentPageIndex: number = 0;
  judges: Judge[] = [];
  locations: Location[] = [];
  // organizers: Organizer[] = [];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private judgeService: JudgeService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      organizer: ['', [Validators.required]],
      location: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      postadress: ['', [Validators.required]],
      startTime: [
        //Not in scope for this version
        '',
        [
          Validators.required,
          Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$'),
        ],
      ],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      registrationStartDate: ['', [Validators.required]],
      registrationEndDate: ['', [Validators.required]],
      competitions: this.fb.array([]),
      permissions: this.fb.group({
        //Not in scope for this version
        udenForKlassen: [true],
        veteranKaniner: [true],
        eftertilmelding: [true],
        traeningsstaevner: [false],
      }),
    });

    this.myForm.valueChanges.subscribe(() => {
      this.myForm.updateValueAndValidity();
    });

    this.fetchJudges();
    this.fetchLocations();
  }

  get competitionControl(): FormArray {
    return this.myForm.get('competitions') as FormArray;
  }

  get permissionsGroupControl(): FormGroup {
    return this.myForm.get('permissions') as FormGroup;
  }

  fetchJudges(): void {
    this.judgeService.getJudge().subscribe({
      next: (judges) => {
        this.judges = judges;
        console.log('Judges fetched successfully:', this.judges);
      },
      error: (err) => {
        console.error('Error fetching judges:', err);
        alert('Failed to fetch judges.');
      },
    });
  }

  fetchLocations(): void {
    this.locationService.getLocation().subscribe({
      next: (locations) => {
        this.locations = locations;
        console.log('Locations fetched successfully:', this.locations);
      },
      error: (err) => {
        console.error('Error fetching Locations:', err);
        alert('Failed to fetch locations.');
      },
    });
  }

  handleSubmit() {
    console.log('Form Submitted:', this.myForm.value);

    if (this.myForm.valid) {
      const formData = this.myForm.value; // Collect the form data
      console.log('Form Submitted:', formData);

      const newEvent: eventRequest = {
        id: '', //Blank as generated on BE
        title: formData.title,
        organizer: '7ca7adbb-5622-428e-b475-e4d947be358e',
        locationId: 'e3ae5b47-95a6-40e6-81a2-5262e5b43bca',
        // organizer: formData.organizer,
        // locationId: formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate,
        registrationStartDate: formData.registrationStartDate,
        registrationEndDate: formData.registrationEndDate,
        competitions: [],
        status: 0,
        sportTypeId: '1035c83a-1899-49cb-bfd6-bcefc1aafffb',
        // sportTypeId: '1',
      };
      console.log('New Event:', JSON.stringify(newEvent, null, 2));

      this.eventService.createEvent(newEvent).subscribe({
        next: (eventResponse) => {
          console.log('Event created successfully:', eventResponse);

          //Create competitions for event.
          const competitions = formData.competitions.map(
            (competition: CompetitionRequest) => ({
              ...competition,
            })
          );

          this.createCompetitions(competitions);
        },
        error: (err) => {
          console.error('Error creating event:', err);
          alert('Failed to create event.');
        },
      });
    } else {
      console.log('Form is invalid');
      alert('Please correct the errors in the form before submitting.');
    }
  }
  createCompetitions(competitions: any[]) {
    alert('Event and competitions created successfully!');
  }

  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
  }
  //Check validation of form components.
  // ngDoCheck(): void {
  //   console.log('Form Valid:', this.myForm.valid);
  //   console.log('Competitions Control Valid:', this.competitionControl.valid);
  //   console.log('Competitions Control Value:', this.competitionControl.value);
  // }
}
