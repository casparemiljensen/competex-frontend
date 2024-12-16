import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CompetitionService } from '../../../service/Competition/competition.service';
import { CompetitionResponse } from '../../../models/competitionResponse';
import { RegistrationService } from '../../../service/registration/registration.service';
import { Participant } from '../../../models/participant';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registration-forms',
  templateUrl: './registration-forms.component.html',
  styleUrls: ['./registration-forms.component.css'],
})
export class RegistrationFormsComponent {
  @Input() competitionsData!: CompetitionResponse[];

  myForm!: FormGroup;
  currentPageIndex: number = 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private competitionService: CompetitionService,
    private registrationService: RegistrationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      // firstName: ['', [Validators.required]],
      // lastName: ['', [Validators.required]],
      // birthday: ['', [Validators.required]],
      // mailAddress: ['', [Validators.required]],
      // phoneNumber: ['', [Validators.required]],
      rabbits: this.fb.array([]),
      member: ['', [Validators.required]],
    });

    // Add the first set of controls by default
    this.addRabbit();
  }

  // Getter for the FormArray
  get rabbitsControls(): FormArray<FormGroup> {
    return this.myForm.get('rabbits') as FormArray<FormGroup>;
  }

  // Method to add a new set of controls
  addRabbit(): void {
    const rabbitForm = this.fb.group({
      rabbitName: ['', [Validators.required]],
      competitions: [[], [this.maxSelectionValidator(3)]],
      udenForKlassen: [false],
    });

    this.rabbitsControls.push(rabbitForm);
  }

  // Method to remove a specific rabbit form
  removeRabbit(index: number): void {
    this.rabbitsControls.removeAt(index);
  }

  maxSelectionValidator(max: number) {
    return (control: FormControl) => {
      const value = control.value || [];
      return value.length <= max ? null : { maxSelection: true };
    };
  }

  handleSubmit(): void {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      console.log('Form Submitted:', formData);

      formData.rabbits.forEach(async (rabbit: any) => {
        const participant = {
          name: `${JSON.parse(formData.member).name} og ${
            JSON.parse(rabbit.rabbitName).name
          }`,
          memberId: `${JSON.parse(formData.member).id}`,
          entityId: `${JSON.parse(rabbit.rabbitName).id}`,
        };
        console.log('Participant:', participant);

        // Send the participant to the backend
        const NewParticipantId = await this.submitParticipant(participant);
        console.log('New Participant ID:', NewParticipantId);
        if (!NewParticipantId) {
          console.error('Error submitting participant');
          return;
        }

        // Send the registration to the backend
        rabbit.competitions.forEach((competition: string) => {
          const newRegistration = {
            competitionId: competition,
            participantId: NewParticipantId,
            registrationDate: new Date().toISOString(),
            status: 0,
          };
          console.log('Registration:', newRegistration);
          this.registrationService.postRegistration(newRegistration).subscribe({
            next: (response) => {
              console.log('Participant submitted successfully:', response);
              return response;
            },
            error: (err) => {
              console.error('Error submitting participant:', err);
              return undefined;
            },
          });
        });
      });
      //Reset form and rabbit array, and create new form addRabbit is ready.
      this.myForm.reset();
      this.rabbitsControls.clear(); // Clear FormArray explicitly
      this.addRabbit();

      //navigate back to the registration page
      this.location.back();
    }
  }

  async submitParticipant(participant: any): Promise<string | undefined> {
    try {
      const response = await this.registrationService
        .postParticipant(participant)
        .toPromise();
      console.log('Participant submitted successfully:', response);
      return response;
    } catch (err) {
      console.error('Error submitting participant:', err);
      return undefined;
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
  }
}
