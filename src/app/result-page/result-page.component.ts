import { Component, OnInit } from '@angular/core';
import { ScoreResultsService } from '../service/scoreResults/score-results.service';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event/event.service';
import { ScoreResultsResponse } from '../models/scoreResultsRespons';
import { eventRespons } from '../models/eventRespons';
import { Observable } from 'rxjs';
import { Participant } from '../models/participant';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  results: ScoreResultsResponse[] = [];
  event!: eventRespons;

  eventId: string = '';
  isLoading = true;

  resultsForExpandableTable: any[] = []; // For binding transformed results

  constructor(
    private scoreResultService: ScoreResultsService,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('eventId') || '';
      if (this.eventId) {
        
        this.fetchEvent(this.eventId).subscribe({
          next: (event) => {
            this.event = event; 
            console.log('Event fetched:', this.event);

            // Might give problems when only one competition is present
            if (this.event.competitions?.length) {
              const competitionIds = this.event.competitions.map(comp => comp.id);
              this.fetchResultsByCompitionId(competitionIds);
            } else {
              console.warn('No competition IDs found in the event.');
            }
          },
          error: (err) => {
            console.error('Error fetching event:', err);
          },
        });
      } else {
        console.error('Event ID is missing in the route.');
      }
    });
  }

  fetchResultsByCompitionId(ids: string[]): void {
    this.scoreResultService.getResultsByIds(ids).subscribe({
      next: (data) => {
        this.results = data.map((result) => {
          console.log('Results for expandable table:', this.resultsForExpandableTable);
          return result; // Ensure the map function returns the correct type
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching competition results:', err);
        this.isLoading = false;
      },
    });
  }

  fetchEvent(eventId: string): Observable<eventRespons> {
    return this.eventService.getEventById(eventId); // Assuming `getEventById` returns Observable<eventRespons>
  }
}
