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
  variable: string = 'Hello';

  constructor(
    private fb: FormBuilder,
    private competitionService: CompetitionService,
    private matchService: MatchService
  ) {}

  competitions: CompetitionResponse[] = [];
  // competitions: Observable<CompetitionResponse[]> | undefined;

  ngOnInit(): void {
    this.fetchCompetition(); //Change this later
    this.nextRound(); //Change this later

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
      console.log('Form Submitted:', formData);
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
  fetchCompetition(): void {
    //Change later
    this.competitionService.getCompetitions().subscribe({
      next: (response) => {
        this.competitions = response;
        console.log(this.competitions);
      },
      error: (err) => console.error('Error fetching competitions:', err),
    });
  }

  //create a new round and create and add the matches that live up to the constraints given by judge.
  nextRound(): void {
    //change when endpoint is done.
    console.log('Next round clicked');
    this.matchService.getMatches().subscribe({
      next: (response) => {
        this.matches = response;
        console.log(this.matches);
      },
      error: (err) => console.error('Error fetching competitions:', err),
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
}
