import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event/event.service';
import { eventResponse } from '../models/eventRespons';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'], // Fix typo: `styleUrl` -> `styleUrls`
})
export class CalenderComponent implements OnInit {
  title = 'Stævne kalender';
  events$: Observable<eventResponse[]> | undefined; // Observable to hold event data

  // Inject the EventService
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  // Use Angular's lifecycle hook to fetch events on component initialization
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const eventId = params.get('id');
      if (eventId) {
        console.log('test');
      } else {
        // handle empty repons here
        console.error('Event ID is missing in the route.');
      }
      // this.fetchEvents();
    });
  }

  // Fetch events from the service
  fetchEvents(): void {
    this.events$ = this.eventService.getEvents();
  }
}
