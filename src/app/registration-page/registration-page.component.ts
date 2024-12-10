import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event/event.service';
import { eventRespons } from '../models/eventRespons';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent implements OnInit {
  event!: eventRespons; // Holds the fetched event
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
        this.fetchEvent(eventId);
      } else {
        // handle empty repons here
        console.error('Event ID is missing in the route.');
      }
    });
  }

  fetchEvent(id: string): void {
    this.eventService.getEventById(id).subscribe(
      (data) => {
        this.event = this.mapApiDataToEvent(data); // Map the API response
        console.log('Fetched Event:', this.event); // Debug fetched event
      },
      (error) => {
        console.error('Failed to fetch event:', error);
      }
    );
  }

  mapApiDataToEvent(data: any): eventRespons {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      location: data.location,
      registrationStartDate: data.registrationStartDate,
      registrationEndDate: data.registrationEndDate,
      status: data.status,
      organizer: data.organizer,
      sportType: data.sportType,
      competitions: data.competitions,
      entryFee: data.entryFee,
    };
  }
}
