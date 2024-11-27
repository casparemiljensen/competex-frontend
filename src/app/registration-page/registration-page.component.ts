import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event/event.service';
import { Event } from '../models/event';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  eventTitle: string = ''; // Holds the event name
  eventCreator: string = ''; // Holds the event creator
  eventId!: number; // Holds the event ID

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    // Extract the event ID from the route
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));

    // Use the EventService to fetch the event by ID
    this.eventService.getEventById(this.eventId).subscribe((event) => {
      if (event) {
        this.eventTitle = event.name; // Set the event title
        this.eventCreator = event.creator; // Set the event creator
      } else {
        this.eventTitle = 'Event Not Found';
        this.eventCreator = '';
      }
    });
  }
}
