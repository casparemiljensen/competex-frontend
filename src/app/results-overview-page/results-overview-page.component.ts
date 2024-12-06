import { Component } from '@angular/core';
import { EventService } from '../service/event/event.service';
import { eventRespons } from '../models/eventRespons';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-results-overview-page',
  templateUrl: './results-overview-page.component.html',
  styleUrl: './results-overview-page.component.css'
})
export class ResultsOverviewPageComponent {
  title = "Resultater for tidliger stævner";

  events: eventRespons[] | undefined;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getEventsBySearchPending().subscribe({
      next: (response: { values: eventRespons[]; pageInfo: any }) => {
        if (Array.isArray(response.values)) {
          this.events = response.values; // Ensure it's an array
        } else {
          console.error('Unexpected response format:', response);
          this.events = []; // Fallback to an empty array
        }
        console.log('Fetched events:', this.events); // Debug log
      },
      error: (err: any) => {
        console.error('Error fetching events:', err); // Improved error log
        this.events = []; // Handle error by initializing with an empty array
      },
    });
  }

  viewEventResults(eventId: string) {
    this.router.navigate([`${eventId}/results`]);
  }
}
