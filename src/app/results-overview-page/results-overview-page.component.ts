import { Component } from '@angular/core';
import { EventService } from '../service/event/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-overview-page',
  templateUrl: './results-overview-page.component.html',
  styleUrl: './results-overview-page.component.css'
})
export class ResultsOverviewPageComponent {
  title = "Resultater for tidliger stævner";

  events: any[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  viewEventResults(eventId: string) {
    this.router.navigate([`${eventId}/results`]);
  }
}
