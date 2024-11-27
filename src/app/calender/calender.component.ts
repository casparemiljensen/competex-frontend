import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService } from '../service/eventTest/event-test.service';
import { eventRespons } from '../models/eventRespons';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'] // Fix typo: `styleUrl` -> `styleUrls`
})
export class CalenderComponent implements OnInit {
  title = "Stævne kalender";
  events$: Observable<eventRespons[]> | undefined; // Observable to hold event data

  // Inject the EventService
  constructor(private eventService: EventService) {}

  // Use Angular's lifecycle hook to fetch events on component initialization
  ngOnInit(): void {
    this.fetchEvents();
  }

  // Fetch events from the service
  fetchEvents(): void {
    this.events$ = this.eventService.getEvents();
    this.events$.subscribe({
      next: (response) => {
        console.log('Fetched Events:', response); // Debug: Log fetched events
      },
      error: (error) => {
        console.error('Error fetching events:', error); // Debug: Log errors
      },
    });
  }
}
