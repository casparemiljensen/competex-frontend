import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-competition-participants-list',
  templateUrl: './competition-participants-list.component.html',
  styleUrl: './competition-participants-list.component.css',
})
export class CompetitionParticipantsListComponent {
  @Input() participants: { name: string }[] = [];
  @Output() selectedParticipantChange = new EventEmitter<number>();
  displayedColumns: string[] = ['number', 'name'];
  dataSource = new MatTableDataSource(this.participants);
  selectedParticipant: any = null;

  ngOnChanges(): void {
    this.dataSource.data = this.participants;
  }

  selectParticipant(participant: any): void {
    this.selectedParticipant = participant;
    const index = this.participants.indexOf(participant);
    this.selectedParticipantChange.emit(index);
  }
}
