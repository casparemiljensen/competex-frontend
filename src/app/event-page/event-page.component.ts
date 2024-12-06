import { Component, OnInit } from '@angular/core';
import { EventPageService } from '../service/event-page/event-page.service';
import { ActivatedRoute } from '@angular/router';
import { eventRespons } from '../models/eventRespons';
import { EventService } from '../service/event/event.service';
import { CompetitionResponse } from '../models/competitionResponse';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent implements OnInit {
  event!: eventRespons;
  isLoading = true;
  

  // This is the tempory, to show how the pange changes give the view is creator of the event or not
  isCreator = true;

  constructor
  (
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
  }

  fetchEvent(eventId: string): void{
    this.EventService.getEventById(eventId).subscribe({
      next: (response) => {
        this.event = response;
      },
      error: (err) => console.error('Error fetching competitions:', err),
    });
  }
}