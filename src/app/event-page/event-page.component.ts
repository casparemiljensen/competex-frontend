import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { eventRespons } from '../models/eventRespons';
import { EventService } from '../service/event/event.service';
import { CompetitionService } from '../service/Competition/competition.service';
import { CompetitionResponse } from '../models/competitionResponse';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css',
})
export class EventPageComponent implements OnInit {
  event!: eventRespons;
  isLoading = true;

  // This is the tempory, to show how the pange changes give the view is creator of the event or not
  isCreator = true;

  constructor(
    private EventService: EventService,
    private CompetitionService: CompetitionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const eventId = params.get('eventId');
      console.log('Event ID:', eventId);
      if (eventId) {
        this.fetchEvent(eventId).subscribe({
          next: (event: eventRespons) => {
            this.event = event;
            const competitionIds = this.event.competitions.map((comp) => comp.id);
            console.log('Competition IDs:', competitionIds);
            if (competitionIds.length > 0) {
              this.fetchResultsByCompetitionId(competitionIds);
            } else {
              console.warn('No competition IDs found.');
            }
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error fetching event:', err);
            this.isLoading = false;
          },
        });
      } else {
        console.warn('No event ID provided in route.');
        this.isLoading = false;
      }
    });
  }
  

  fetchEvent(eventId: string): Observable<eventRespons> {
    return this.EventService.getEventById(eventId);
  }
  
  fetchResultsByCompetitionId(ids: string[]): void {
    this.CompetitionService.getCompetitionsByIds(ids).subscribe({
      next: (response) => {
        console.log('Results: this is the ', response);
        // Handle the fetched results, e.g., store them in a component property or pass them to a UI handler.
      },
      error: (err) => {
        console.error('Error fetching competition results:', err);
        // Handle the error, e.g., show an error message to the user.
      },
    });
  }
}
