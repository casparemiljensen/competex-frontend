import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event/event.service';
import { eventResponse } from '../models/eventRespons';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent implements OnInit {
  event!: eventResponse; // Holds the fetched event
  eventTitle: any;
  eventCreator: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    // Get the event ID from the route
    this.route.paramMap.subscribe((params) => {
      const eventId = params.get('id');
      if (eventId) {
        this.getEvent(eventId);
      } else {
        // handle empty repons here
        console.error('Event ID is missing in the route.');
      }
    });
  }

  getEvent(id: string): void {
    this.eventService.getEventById(id).subscribe(
      (data) => {
        this.event = data; // Map the API response
        console.log('Fetched Event:', this.event); // Debug fetched event
      },
      (error) => {
        console.error('Failed to fetch event:', error);
      }
    );
  }
}
