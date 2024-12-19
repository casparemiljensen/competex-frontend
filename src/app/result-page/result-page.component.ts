import { Component, OnInit } from '@angular/core';
import { ScoreResultsService } from '../service/scoreResults/score-results.service';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event/event.service';
import { ScoreResultsResponse } from '../models/scoreResultsRespons';
import { eventResponse } from '../models/eventRespons';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css'],
})
export class ResultPageComponent implements OnInit {
  results: ScoreResultsResponse[] = [];
  event: eventResponse | null = null; // Initialize as null to handle cases when no event is found

  transformedObject: any[] = []; // Ensure it's an array to avoid template issues

  eventId: string = '';
  isLoading = true;

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

            if (this.event?.competitions?.length) {
              const competitionIds = this.event.competitions.map(
                (comp) => comp.id
              );
              if (competitionIds.length === 0) {
                console.warn('No competition IDs found in the event.');
                this.isLoading = false;
              } else {
                this.fetchResultsByCompitionId(competitionIds);
              }
            } else {
              console.warn('No competitions found in the event.');
              this.isLoading = false;
            }
          },
          error: (err) => {
            console.error('Error fetching event:', err);
            this.event = null;
            this.isLoading = false; // Stop spinner
          },
        });
      } else {
        console.error('Event ID is missing in the route.');
        this.isLoading = false; // Stop spinner
      }
    });
  }

  transformObject(obj: any): any[] {
    if (!obj || obj.length === 0) {
      console.warn('transformObject received empty or invalid data.');
      return [];
    }
    console.log('Competition:', obj);

    return obj
      .filter(
        (competition: any) =>
          competition.values && competition.values.length > 0
      )
      .map((competition: any) => ({
        ExpandableTable:
          competition.values[0]?.competition?.name || 'Unknown Competition',
        data: competition.values.map((value: any) => ({
          Deltager: value.participant?.member
            ? `${value.participant.member.firstName} ${value.participant.member.lastName}`
            : 'Unknown Participant',
          Kanin: value.participant?.entity?.name || 'Unknown Entity',
          Fejl: value.faults ?? 'N/A',
          Tid: value.time ?? 'N/A',
        })),
      }));
  }

  fetchResultsByCompitionId(ids: string[]): void {
    if (!ids || ids.length === 0) {
      console.warn('No competition IDs provided for fetching results.');
      this.transformedObject = [];
      this.isLoading = false;
      return;
    }

    this.scoreResultService
      .getResultsByIds(ids)
      .pipe(
        catchError((err) => {
          console.error('Error fetching results:', err);
          this.transformedObject = [];
          this.isLoading = false;
          return of([]); // Return an empty array to handle errors gracefully
        })
      )
      .subscribe((data: any[]) => {
        console.log('Results fetched:', data);
        if (data && data.length > 0) {
          this.transformedObject = this.transformObject(data);
          console.log('Transformed object:', this.transformedObject);
        } else {
          console.warn('No results returned from API.');
          this.transformedObject = [];
        }
        this.isLoading = false; // Stop spinner
      });
  }

  fetchEvent(eventId: string): Observable<eventResponse | null> {
    return this.eventService.getEventById(eventId).pipe(
      catchError((err) => {
        console.error('Error fetching event:', err);
        this.isLoading = false;
        return of(null); // Return null to indicate failure
      })
    );
  }
}
