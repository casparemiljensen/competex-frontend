import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../basic-components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-comp-start',
  templateUrl: './comp-start.component.html',
  styleUrls: ['./comp-start.component.css']
})
export class CompStartComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<void>();
  buttonText: string = 'Aktiv'; // or 'Afsluttet', set dynamically as needed
  competitionData: any;
  competitionName = "Boys U12 Football";

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCompetitionData();
  }

  getCompetitionData(): void {
    this.http.get<any[]>('api/competitions')
      .subscribe(data => {
        const competition = data.find(comp => comp.competition === this.competitionName);
        if (competition) {
          this.competitionData = competition.data;
        } else {
          console.error('Competition not found');
        }
      });
  }

  openConfirmDialog(buttonText: string, match: any): void {
    // Define different dialog data based on the button text
    let dialogData = {
      title: '',
      message: ''
    };

    if (buttonText === 'Aktiv') {
      dialogData.title = 'OPS! Du er ved at redigere i en aktiv konkurrence!';
      dialogData.message = 'Ønsker du at fortsætte?';
    } else if (buttonText === 'Afsluttet') {
      dialogData.title = 'OPS! Du er ved at redigere i en afsluttet konkurrence!';
      dialogData.message = 'Ønsker du at fortsætte?';
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User chose to continue, emit buttonClick event
        this.buttonClick.emit();
        console.log("User chose to proceed with:", match);
      } else {
        // User chose to go back
        console.log("User cancelled action for:", match);
      }
    });
  }
}
