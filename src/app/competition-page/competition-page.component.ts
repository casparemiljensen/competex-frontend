import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CompetitionService } from '../service/Competition/competition.service';
import { CompetitionResponse } from '../models/competitionResponse';
import { MatchResponse } from '../models/matchResponse';
import { MatchService } from '../service/match/match.service';
import { ParticipantType, Team, Single, Ekvipage } from '../models/participant';
import { MatchRequest } from '../models/matchRequest';
import { ActivatedRoute } from '@angular/router';
import { RoundService } from '../service/Round/round.service';
import { CreateRoundRequest, RoundRequest } from '../models/roundRequest';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-competition-page',
  templateUrl: './competition-page.component.html',
  styleUrl: './competition-page.component.css',
})
export class CompetitionPageComponent {
  myForm!: FormGroup; //Form group for result view.
  detailsSubmitted = false; //Boolean to check if detaisl form is submitted.

  competition!: CompetitionResponse;
  competitionId!: string;
  matches: MatchResponse[] = [];
  selectedMatch: MatchResponse | null = null;
  showRoundDetailsView = false;

  constructor(
    private fb: FormBuilder,
    private competitionService: CompetitionService,
    private matchService: MatchService,
    private roundService: RoundService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.competitionId = this.route.snapshot.paramMap.get('id')!;
    console.log('CompetitionId passed: ', this.competitionId); // Use the compId as needed
    if (this.competitionId) {
      this.fetchCompetition(this.competitionId);
    } else {
      console.error('Competition ID is missing in the route.');
    }

    this.myForm = this.fb.group({
      dommer: ['', [Validators.required]],
      aspirant: ['', []],
      bedmetode: ['', [Validators.required]],
    });
  }

  bedMetodeOptions = [
    { value: 'd1', viewValue: 'D1' },
    { value: 'c1', viewValue: 'C1' },
    { value: 'd2', viewValue: 'D2' },
    { value: 'c2', viewValue: 'C2' },
  ];

  get dommerControl(): FormControl {
    return this.myForm.get('dommer') as FormControl;
  }
  get aspirantControl(): FormControl {
    return this.myForm.get('aspirant') as FormControl;
  }
  get bedMetodeControl(): FormControl {
    return this.myForm.get('bedmetode') as FormControl;
  }

  handleSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value; // Collect the form data
      this.detailsSubmitted = true;
      console.log('Form Submitted :', formData);
      // You can also send the form data to a server here using an API
      // Example: this.http.post('api-url', formData).subscribe(response => { ... });
    } else {
      console.log('Form is invalid');
      alert('Please correct the errors in the form before submitting.');
    }
  }

  handleParticipantChange(selectedIndex: number): void {
    console.log('Selected Participant Index:', selectedIndex);
  }

  //Fetch the given competition to display on page.
  fetchCompetition(competition: string): void {
    //Change later
    this.competitionService.getCompetitionById(competition).subscribe({
      next: (response) => {
        this.competition = response;
        console.log('Competition: ', this.competition);
      },
      error: (err) => console.error('Error fetching competition:', err),
    });
  }

  selectMatch(match: MatchResponse): void {
    //Select a match to display in the ResultView
    this.selectedMatch = { ...match };
    console.log('Selected Match:', this.selectedMatch);
  }

  updateMatchList(updatedMatch: MatchRequest) {
    const matchIndex = this.matches.findIndex((m) => m.id === updatedMatch.id);
    if (matchIndex > -1) {
      this.matches[matchIndex].status = updatedMatch.status;
    }
  }

  onNewRoundClick(): void {
    const newRound: CreateRoundRequest = {
      competitionId: this.competitionId,
      sequenceNumber: 0, // Add the missing sequenceNumber property
    };

    this.roundService.createMatchesForRound(newRound).subscribe({
      next: (response: MatchResponse[]) => {
        console.log('Matches created for first round: ', response);
        this.addDetailsToMatches(response); // Update this line to pass a single MatchResponse object
      },
      error: (err) => {
        console.error('Error creating matches for round:', err);
      },
    });
  }
  onNextRoundClick(): void {
    this.showRoundDetailsView = !this.showRoundDetailsView;
  }
  onRoundDetailsSubmit(form: any): void {
    this.showRoundDetailsView = !this.showRoundDetailsView;
    const count = this.matches[0].round.sequenceNumber;
    console.log('current count:', count);
    console.log('detailt form:', form);
    const newRound: CreateRoundRequest = {
      competitionId: this.competitionId,
      sequenceNumber: count + 1,
      maxFaults: form.fault,
      maxMinutes: form.time,
    };

    this.roundService.createMatchesForRound(newRound).subscribe({
      next: (response: MatchResponse[]) => {
        console.log(
          `Matches created for round ${newRound.sequenceNumber}: `,
          response
        );
        this.addDetailsToMatches(response);
      },
      error: (err) => {
        console.error('Error creating matches for round:', err);
      },
    });
  }

  addDetailsToMatches(matches: MatchResponse[]) {
    //Add judge, starttime, endtime, field to the matches
    matches.forEach((match) => {
      // Create updated match object
      const updatedMatch: MatchRequest = {
        id: match.id,
        roundId: match.roundId,
        participantIds: match.participantIds,
        status: 0,
        judgeId: 'd8ce4939-e44c-443f-8bfe-3568463ecc7b', // Add the missing judge property
        startTime: '2024-12-10T05:23:50.032Z', // Add the missing startTime property
        endTime: '2024-12-10T05:23:50.032Z', // Add the missing endTime property
        fieldId: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', // Add the missing field propert
      };
      this.matchService.updateMatch(updatedMatch).subscribe({
        next: () => {
          console.log(`Match ${match.id} updated successfully.`);

          // Update the local match object with new details
          match.judgeId = updatedMatch.judgeId;
          match.startTime = updatedMatch.startTime;
          match.endTime = updatedMatch.endTime;
          match.fieldId = updatedMatch.fieldId;
          match.status = updatedMatch.status;
        },
        error: (err) => {
          console.error(`Error updating match ${match.id}:`, err);
        },
      });
    });
    this.matches = [...matches];
  }
}
