import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatchResponse } from '../../models/matchResponse';
import { MatchRequest } from '../../models/matchRequest';
import { Participant } from '../../models/participant';
import { MatchService } from '../../service/match/match.service';
import { TimeFaultScore, TimeScore } from '../../models/scoreRequest';
import { ScoreService } from '../../service/Score/score.service';

@Component({
  selector: 'app-competition-result-view',
  templateUrl: './competition-result-view.component.html',
  styleUrl: './competition-result-view.component.css',
})
export class CompetitionResultViewComponent {
  @Input() match: MatchResponse | null = null;
  @Output() matchUpdated = new EventEmitter<MatchRequest>();

  //Form group for results form.
  resultForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matchService: MatchService,
    private scoreService: ScoreService
  ) {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('Changes in result view:', changes);
  //   if (changes['match']) {
  //     console.log('MatchResponse in result view:', this.match);
  //   }
  // }

  ngOnInit(): void {
    this.resultForm = this.fb.group({
      fault: ['', [Validators.required, Validators.min(0), Validators.max(14)]],
      time: ['', [Validators.required]],
      // correction: ['', [Validators.required]],
      // adv: [false],
      // disq: [false],
      // trukket: [false],
    });

    //Diskvalificeret og trukket er disabled i denne version
    // this.resultForm.get('disq')?.valueChanges.subscribe((value) => {
    //   this.updateFieldStatus(value);
    // });

    // this.resultForm.get('trukket')?.valueChanges.subscribe((value) => {
    //   this.updateFieldStatus(value);
    // });
  }

  editParticipant(): void {
    // Add logic to handle participant editing
    console.log('Edit participant clicked');
    alert('Edit participant clicked');
  }

  //Diskvalificeret og trukket er disabled i denne version
  // updateFieldStatus(isChecked: boolean): void {
  //   // Disable form fields if disq or trukket is checked
  //   if (isChecked) {
  //     this.resultForm.get('adv')?.disable();
  //     this.resultForm.get('fault')?.disable();
  //     this.resultForm.get('time')?.disable();
  //     this.resultForm.get('correction')?.disable();
  //   } else {
  //     !this.resultForm.get('disq')?.value &&
  //       !this.resultForm.get('trukket')?.value;
  //     this.resultForm.get('adv')?.enable();
  //     this.resultForm.get('fault')?.enable();
  //     this.resultForm.get('time')?.enable();
  //     this.resultForm.get('correction')?.enable();
  //   }
  // }

  handleSubmit() {
    console.log('Form fields:', this.resultForm.value);
    // Handle form submission
    if (this.resultForm.valid && this.match) {
      const formData = this.resultForm.value; // Collect the form data
      console.log('Form Submitted:', formData);

      const newScore: TimeFaultScore = {
        $type: 'TimeFaultScore',
        matchId: this.match!.id!,
        participantId: this.match!.participantIds[0]!, // Assuming only 1 participant in match
        time: formData.time, // Map form value to the time field
        faults: formData.fault, // Map form value to the faults field
      };
      console.log('Constructed TimeScore:', newScore);

      this.scoreService.createScore(newScore).subscribe({
        next: (response) => {
          console.log('Score created successfully:', response);

          const updatedMatch: MatchRequest = {
            id: this.match!.id!,
            roundId: this.match!.roundId!,
            participantIds: this.match!.participantIds!,
            status: 3, // Completed when result us submitted
            startTime: this.match!.startTime!,
            endTime: this.match!.endTime!,
            fieldId: this.match!.fieldId!,
            judgeId: this.match!.judgeId!,
          };

          console.log('Updated Match:', JSON.stringify(updatedMatch, null, 2));

          this.matchService.updateMatch(updatedMatch).subscribe({
            next: (response) => {
              console.log('Match updated successfully:', response);
              alert('Match updated successfully!');
              this.matchUpdated.emit(updatedMatch);

              this.match = null; // Clear the match to hide the form
            },
            error: (err) => {
              console.error('Error updating match:', err);
              alert('Failed to update match.');
            },
          });
        },
        error: (err) => {
          console.error('Error creating score:', err);
          alert('Failed to create score.');
        },
      });
    } else {
      console.log('Form is invalid');
      alert('Please correct the errors in the form before submitting.');
    }
  }
}
