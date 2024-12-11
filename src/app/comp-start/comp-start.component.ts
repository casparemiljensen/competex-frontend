import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../basic-components/confirm-dialog/confirm-dialog.component';
import { eventResponse } from '../models/eventRespons';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event/event.service';
import { Router } from '@angular/router';
import { Status } from '../models/enums';

@Component({
  selector: 'app-comp-start',
  templateUrl: './comp-start.component.html',
  styleUrls: ['./comp-start.component.css'],
})
export class CompStartComponent implements OnInit {
  event!: eventResponse;
  isLoading = true;
  test!: any[];
  public status = Status;

  @Output() buttonClick = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private EventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const eventId = params.get('eventId');
      if (eventId) {
        this.fetchEvent(eventId);
      } else {
        // handle empty repons here
        console.error('Event ID is missing in the route.');
      }
    });

    this.isLoading = false;
  }

  fetchEvent(eventId: string): void {
    this.EventService.getEventById(eventId).subscribe({
      next: (response) => {
        this.event = response;
        console.log(this.event);
      },
      error: (err) => console.error('Error fetching competitions:', err),
    });
  }

  getStatusString(status: number): string {
    if (status === 0) {
      return 'Start';
    }
    if (status === 1) {
      return 'Aktiv';
    }
    if (status === 2 || status === 3) {
      return 'Afslutet';
    } else {
      return Status[status];
    }
  }

  openConfirmDialog(buttonText: string, comp: any): void {
    if (buttonText === '0') {
      // the 0 here is in sted of "start"
      this.router.navigate(['/competition-page', comp.id]);
      return; // Do not open the dialog if buttonText is "Start"
    }

    let dialogData = {
      title: '',
      message: '',
    };
    if (buttonText === '1') {
      // the 1 here is for the active enume status
      dialogData.title = 'OPS! Du er ved at redigere i en aktiv konkurrence!';
      dialogData.message = 'Ønsker du at fortsætte?';
    } else if (buttonText === '2' || buttonText === '3') {
      //the 2 and 3 are for the cancled anc ocnclude traits in that stauts
      dialogData.title =
        'OPS! Du er ved at redigere i en afsluttet konkurrence!';
      dialogData.message = 'Ønsker du at fortsætte?';
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.buttonClick.emit();
        console.log(buttonText);
        console.log('User  chose to proceed with:', comp);
      } else {
        console.log('User  cancelled action for:', comp);
      }
    });
  }
}
