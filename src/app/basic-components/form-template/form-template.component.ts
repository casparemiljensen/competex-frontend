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
import { Organizer } from '../../models/organizer';
import { OrganizerService } from '../../service/organizerService/organizer.service';
import { Member } from '../../models/member';
import { CompetitionType } from '../../models/competitionType';
import { CompetitionTypeService } from '../../service/CompetitionType/competition-type.service';

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
  organizers: Member[] = [];
  competitionTypes: CompetitionType[] = [];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private competitionTypeService: CompetitionTypeService,
    private locationService: LocationService,
    private organizerService: OrganizerService,
    private competitionService: CompetitionService
  ) {}

  ngOnInit(): void {
    //Create date object for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern('^[A-Z].*')]],
      organizer: ['', [Validators.required]],
      location: ['', [Validators.required]],
      entryFee: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      startDate: ['', [Validators.required, this.notInPastValidator(today)]], //Date not in past
      endDate: [
        '',
        [
          Validators.required,
          this.notInPastValidator(today), // Cannot be in the past
          this.afterOrEqualDateValidator('startDate'), // Must be after or equal to startDate
        ],
      ],
      registrationStartDate: [
        '',
        [
          Validators.required,
          this.notInPastValidator(today), // Cannot be in the past
          this.beforeOrEqualDateValidator('startDate'), // Cannot be after startDate,
        ],
      ],
      registrationEndDate: [
        '',
        [
          Validators.required,
          this.notInPastValidator(today), // Cannot be in the past
          this.beforeOrEqualDateValidator('startDate'), // Cannot be after startDate
        ],
      ],
      competitions: this.fb.array([]),
      permissions: this.fb.group({
        //Not in scope for this version
        udenForKlassen: [true],
        veteranKaniner: [true],
        eftertilmelding: [true],
        traeningsstaevner: [false],
      }),
      // startTime: [
      //   //Not in scope for this version
      //   '',
      //   [
      //     Validators.required,
      //     Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$'),
      //   ],
      // ],
      // adress: ['', [Validators.required]],
      // postadress: ['', [Validators.required]],
    });

    this.fetchCompetitionTypes();
    this.fetchLocations();
    this.fetchOrganizers();
  }

  get competitionControl(): FormArray {
    return this.myForm.get('competitions') as FormArray;
  }

  get permissionsGroupControl(): FormGroup {
    return this.myForm.get('permissions') as FormGroup;
  }

  fetchCompetitionTypes(): void {
    this.competitionTypeService.getCompetitionType().subscribe({
      next: (data) => {
        this.competitionTypes = data;
        console.log(
          'CompetitionTypes fetched successfully:',
          this.competitionTypes
        );
      },
      error: (err) => {
        console.error('Error fetching competitionTypes:', err);
        alert('Failed to fetch competitionTypes.');
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
  //Fetch organizers
  fetchOrganizers(): void {
    this.organizerService.getOrganizer().subscribe({
      next: (organizers) => {
        this.organizers = organizers;
        console.log('Organizers fetched successfully:', this.organizers);
      },
      error: (err) => {
        console.error('Error fetching organizers:', err);
        alert('Failed to fetch organizers.');
      },
    });
  }

  handleSubmit(): void {
    if (this.myForm.valid) {
      const formData = this.myForm.value;

      // Step 1: Create the event object
      const newEvent: eventRequest = {
        title: formData.title,
        organizerId: formData.organizer,
        locationId: formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate,
        registrationStartDate: formData.registrationStartDate,
        registrationEndDate: formData.registrationEndDate,
        competitionIds: [], // Map to competition objects
        status: 0,
        sportTypeId: '3a2b1a0d-9e8f-7d6c-5b4a-3f2e1d0c9b8a',
        entryFee: formData.entryFee,
      };
      //Create the event request.
      this.eventService.createEvent(newEvent).subscribe({
        next: (eventResponse) => {
          console.log('Event created successfully:', eventResponse);

          // Step 2: Prepare and create competitions using the `eventId`
          const competitions = formData.competitions.map((data: any) => ({
            eventId: eventResponse.id, // Use the eventId from the response
            competitionTypeId: data.competitionType,
            startDate: formData.startDate,
            endDate: formData.endDate,
            level: parseInt(data.level, 10),
            status: 0,
            minParticipants: 0,
            maxParticipants: 100,
            registrationPrice: data.price,
          }));

          competitions.forEach((competition: CompetitionRequest) => {
            this.competitionService.createCompetition(competition).subscribe({
              next: (competitionResponse) => {
                console.log(
                  'Competition created successfully:',
                  competitionResponse
                );
              },
              error: (err) => {
                console.error('Error creating competition:', err);
              },
            });
          });

          alert('Event and competitions created successfully!');
        },
        error: (err) => {
          console.error('Error creating event:', err);
          alert('Failed to create the event.');
        },
      });
    } else {
      console.log('Form is invalid');
      this.checkFormValidation();
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
  }

  // Validator to ensure a date is not in the past
  notInPastValidator(today: Date) {
    return (control: FormControl) => {
      const controlDate = new Date(control.value);
      if (control.value && controlDate < today) {
        return { notInPast: true };
      }
      return null;
    };
  }
  // Validator to ensure a date is after or equal to another date
  afterOrEqualDateValidator(compareDateField: string) {
    return (control: FormControl) => {
      if (!control.parent) return null; // Avoid errors during initialization
      const compareDate = new Date(control.parent.get(compareDateField)?.value);
      const controlDate = new Date(control.value);
      if (control.value && compareDate && controlDate < compareDate) {
        return { afterOrEqual: true };
      }
      return null;
    };
  }
  // Validator to ensure a date is before or equal to another date
  //A validator function that return a function that takes a form control as an argument. Used in form control validation.
  beforeOrEqualDateValidator(compareDateField: string) {
    return (control: FormControl) => {
      if (!control.parent) return null; // Avoid errors during initialization
      const compareDate = new Date(control.parent.get(compareDateField)?.value);
      const controlDate = new Date(control.value);
      if (control.value && compareDate && controlDate > compareDate) {
        return { beforeOrEqual: true }; // Validation error, viser at denne validering er årsag til fejlen.
      }

      return null; // Validation passed
    };
  }
  checkFormValidation(): void {
    Object.keys(this.myForm.controls).forEach((key) => {
      const control = this.myForm.get(key);
      if (control) {
        console.log(`Field: ${key}`);
        console.log(`  - Value: ${control.value}`);
        console.log(`  - Valid: ${control.valid}`);
        console.log(`  - Errors: `, control.errors);
        console.log(`  - Touched: ${control.touched}`);
        console.log(`  - Dirty: ${control.dirty}`);
      }
    });
  }
}
