import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../basic-components/confirm-dialog/confirm-dialog.component';
import { EventPageService } from '../service/event-page/event-page.service';

@Component({
  selector: 'app-comp-start',
  templateUrl: './comp-start.component.html',
  styleUrls: ['./comp-start.component.css']
})
export class CompStartComponent implements OnInit {
  ExpandableTableData: any[] = [];
  judgeData: any[] = [];
  displayedColumns: string[] = [];
  isLoading = true;

  @Output() buttonClick = new EventEmitter<void>();

  constructor(private http: HttpClient, public dialog: MatDialog, private eventPageService: EventPageService) {}

  ngOnInit(): void {
    this.isLoading = false;

    // Fetch judge data
    this.eventPageService.getJudge().subscribe(data => {
      this.judgeData = data;
    });

    // Fetch ExpandableTable data
    this.eventPageService.getExpandableTables().subscribe(data => {
      this.ExpandableTableData = data;
    });
  }

  openConfirmDialog(buttonText: string, match: any): void {
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
        this.buttonClick.emit();
        console.log("User  chose to proceed with:", match);
      } else {
        console.log("User  cancelled action for:", match);
      }
    });
  }
}