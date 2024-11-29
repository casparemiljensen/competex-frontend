import { Component } from '@angular/core';
import { EventService } from '../service/eventTest/event-test.service';
import { eventRespons } from '../models/eventRespons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-overview-page',
  templateUrl: './results-overview-page.component.html',
  styleUrl: './results-overview-page.component.css'
})
export class ResultsOverviewPageComponent {
  title = "Resultater for tidliger stævner";

  events: eventRespons[] = []

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getEventsBySearchPending().subscribe({
      next: (response) => {
        this.events = response; // Assign the response to `this.events`
        console.log('Fetched events:', this.events); // Debug log
      },
      error: (err) => {
        console.error('Error fetching events:', err); // Improved error log
      },
    });
  }

  viewEventResults(eventId: string) {
    this.router.navigate([`${eventId}/results`]);
  }
}
