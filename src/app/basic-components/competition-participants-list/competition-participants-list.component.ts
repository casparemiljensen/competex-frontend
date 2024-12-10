import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatchResponse } from '../../models/matchResponse';
import { Participant } from '../../models/participant';

@Component({
  selector: 'app-competition-participants-list',
  templateUrl: './competition-participants-list.component.html',
  styleUrl: './competition-participants-list.component.css',
})
export class CompetitionParticipantsListComponent {
  @Input() matches: MatchResponse[] = [];
  @Input() participants: Participant[] = [];
  @Output() matchSelected = new EventEmitter<MatchResponse>();
  @Output() newRoundClick = new EventEmitter<void>();
  @Output() nextRoundClick = new EventEmitter<void>();

  displayedColumns: string[] = ['number', 'name'];
  dataSource = new MatTableDataSource<MatchResponse>([]);
  selectedMatch: MatchResponse | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['matches'] && changes['matches'].currentValue) {
      this.dataSource.data = this.matches; // Update the data source when matches input changes
    }
  }

  onSelectMatch(match: MatchResponse): void {
    // Emit the selected match
    console.log('OnSelectMatch in startlist: ', match);
    this.matchSelected.emit(match); // Emit the selected match
    this.selectedMatch = match;
  }
  handleNewRoundClick(): void {
    this.newRoundClick.emit();
  }
  handleNextRoundClick(): void {
    this.nextRoundClick.emit();
  }
}
