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
import { JudgeService } from '../service/judge/judge.service';
import { LocationService } from '../service/location/location.service';

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

  fieldOptions: { value: string; viewValue: string }[] = [];
  judgeOptions: { value: string; viewValue: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private competitionService: CompetitionService,
    private matchService: MatchService,
    private roundService: RoundService,
    private route: ActivatedRoute,
    private judgeService: JudgeService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.competitionId = this.route.snapshot.paramMap.get('id')!;
    this.getFieldsOptions();
    this.getJudgeOptions();
    console.log('CompetitionId passed: ', this.competitionId); // Use the compId as needed
    if (this.competitionId) {
      this.fetchCompetition(this.competitionId);
      this.existingMatches(this.competitionId);
    } else {
      console.error('Competition ID is missing in the route.');
    }

    this.myForm = this.fb.group({
      judge: ['', [Validators.required]],
      method: ['', [Validators.required]],
      field: ['', [Validators.required]],
      startTime: ['', []],
    });
  }

  methodOptions = [
    { value: 'd1', viewValue: 'D1' },
    { value: 'c1', viewValue: 'C1' },
    { value: 'd2', viewValue: 'D2' },
    { value: 'c2', viewValue: 'C2' },
  ];

  get judgeControl(): FormControl {
    return this.myForm.get('judge') as FormControl;
  }
  get methodControl(): FormControl {
    return this.myForm.get('method') as FormControl;
  }
  get fieldControl(): FormControl {
    return this.myForm.get('field') as FormControl;
  }
  get startTimeControl(): FormControl {
    return this.myForm.get('startTime') as FormControl;
  }

  handleDetailsSubmit() {
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
    const newRound: RoundRequest = {
      name: 'Round 1',
      sequenceNumber: 0,
      competitionId: this.competitionId,
      status: 0,
    };

    this.roundService.createRound(newRound).subscribe({
      next: (response: string) => {
        console.log('Round created:', response);

        const newMatchesForRound: CreateRoundRequest = {
          competitionId: this.competitionId,
          sequenceNumber: 0, // Add the missing sequenceNumber property
        };

        this.roundService.createMatchesForRound(newMatchesForRound).subscribe({
          next: (response: MatchResponse[]) => {
            console.log('Matches created for first round: ', response);
            this.addDetailsToMatches(response); // Update this line to pass a single MatchResponse object
          },
          error: (err) => {
            console.error('Error creating matches for round:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error creating round:', err);
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

    const newRound: RoundRequest = {
      name: 'Round ' + (count + 1),
      sequenceNumber: count + 1,
      competitionId: this.competitionId,
      status: 0,
    };
    this.roundService.createRound(newRound).subscribe({
      next: (response: string) => {
        console.log(`Round ${newRound.name} created successfully: `, response);

        const newMatchesForRound: CreateRoundRequest = {
          competitionId: this.competitionId,
          sequenceNumber: count + 1,
          maxFaults: form.fault,
          maxMinutes: form.time,
        };

        this.roundService.createMatchesForRound(newMatchesForRound).subscribe({
          next: (response: MatchResponse[]) => {
            console.log(
              `Matches created for round ${newMatchesForRound.sequenceNumber}: `,
              response
            );
            this.addDetailsToMatches(response);
          },
          error: (err) => {
            console.error('Error creating matches for round:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error creating round:', err);
      },
    });
  }

  addDetailsToMatches(matches: MatchResponse[]) {
    //Add judge, starttime, endtime, field to the matches
    matches.forEach((match) => {
      console.log('match participant:', match.participantIds);
      // Create updated match object
      const updatedMatch: MatchRequest = {
        id: match.id,
        roundId: match.roundId,
        participantIds: match.participantIds,
        status: 0,
        judgeId: this.judgeControl.value, // Add the missing judge property
        startTime: '2024-12-10T05:23:50.032Z', // Add the missing startTime property
        endTime: '2024-12-10T05:23:50.032Z', // Add the missing endTime property
        fieldId: this.fieldControl.value, // Add the missing field propert
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

  existingMatches(competitionId: string): void {
    this.roundService.getRoundsByCompetitionId(competitionId).subscribe({
      next: (response) => {
        const rounds = response;
        console.log('Existing Rounds:', response);
        if (rounds.length > 0) {
          const highestSequenceRound = rounds.reduce((prev, current) => {
            return prev.sequenceNumber > current.sequenceNumber
              ? prev
              : current;
          });
          console.log(
            'Round with highest sequence number:',
            highestSequenceRound
          );
          this.matchService
            .getMatchesByRoundId(highestSequenceRound.id)
            .subscribe({
              next: (matches) => {
                console.log(
                  'Matches for the round with the highest sequence number:',
                  matches
                );
                this.matches = matches;
                console.log('All Matches:', this.matches);
                // Handle the matches as needed
              },
              error: (err) =>
                console.error(
                  'Error fetching matches for the highest sequence round:',
                  err
                ),
            });
        }
      },
      error: (err) => console.error('Error fetching existing matches:', err),
    });
  }
  getFieldsOptions(): void {
    this.locationService.getFields().subscribe((data) => {
      console.log('Fields:', data);
      this.fieldOptions = data.map((field) => ({
        value: field.id || '',
        viewValue: field.name || '',
      }));
      console.log('Field Options:', this.fieldOptions);
    });
  }
  getJudgeOptions(): void {
    this.judgeService.getJudges().subscribe((data) => {
      console.log('Judges:', data);
      this.judgeOptions = data.map((judge) => ({
        value: judge.id || '',
        viewValue: `${judge.member.firstName} ${judge.member.lastName}` || '',
      }));
      console.log('Judge Options:', this.judgeOptions);
    });
  }

  getJudgeNameById(judgeId: string): string {
    const judge = this.judgeOptions.find((option) => option.value === judgeId);
    return judge ? judge.viewValue : 'Dommer ikke valgt'; // Default text if no judge is selected
  }

  getFieldNameById(fieldId: string): string {
    const field = this.fieldOptions.find((option) => option.value === fieldId);
    return field ? field.viewValue : 'Bane ikke valgt'; // Default text if no field is selected
  }
  getMethodNameById(methodId: string): string {
    const field = this.methodOptions.find(
      (option) => option.value === methodId
    );
    return field ? field.viewValue : 'Metode ikke valgtt'; // Default text if no method is selected
  }

  finishCompetition(): void {}
}
