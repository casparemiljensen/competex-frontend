import { Component, OnInit } from '@angular/core';
import { EventPageService } from '../service/event-page/event-page.service';
import { ActivatedRoute } from '@angular/router';
import { eventRespons } from '../models/eventRespons';
import { EventService } from '../service/eventTest/event-test.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent implements OnInit {

  //delete when not needed
  ExpandableTableData: any[] = [];
  judgeData: any[] = [];
  displayedColumns: string[] = [];

  event!: eventRespons;
  isLoading = true;

  // This is the tempory, to show how the pange changes give the view is creator of the event or not
  isCreator = true;

  constructor
  (
    private eventPageService: EventPageService,
    private EventService: EventService,
    private route: ActivatedRoute
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
    
    // //Fetch judge data
    // this.eventPageService.getJudge().subscribe(data => {
    //   this.judgeData = data;
    // });

    // //Fetch ExpandableTable data
    // this.eventPageService.getExpandableTables().subscribe(data => {
    //   this.ExpandableTableData = data;
    // });
  }

  fetchEvent(eventId: string): void{
    this.EventService.getEventById(eventId).subscribe({
      next: (response) => {
        this.event = response;
        console.log(this.event);
      },
      error: (err) => console.error('Error fetching competitions:', err),
    });
  }
}