import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Match } from '../../models/match';
import { MatchService } from '../../service/match/match.service';

@Component({
  selector: 'app-competition-participants-list',
  templateUrl: './competition-participants-list.component.html',
  styleUrl: './competition-participants-list.component.css',
})
export class CompetitionParticipantsListComponent {
  @Input() roundID: any = null;
  @Input() participants: { name: string }[] = [];
  @Output() selectedParticipantChange = new EventEmitter<number>();

  displayedColumns: string[] = ['number', 'name'];
  dataSource = new MatTableDataSource(this.participants);
  selectedParticipant: any = null;
  matches: Match[] = [];

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.fetchMatches();
  }
  ngOnChanges(): void {
    this.dataSource.data = this.participants;
  }

  selectParticipant(participant: any): void {
    this.selectedParticipant = participant;
    const index = this.participants.indexOf(participant);
    this.selectedParticipantChange.emit(index);
  }

  fetchMatches(): void {
    this.matchService.getMatches().subscribe({
      next: (data) => {
        this.matches = data;
        console.log('Matches:', this.matches);
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });
  }
}
