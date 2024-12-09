import { Component, OnInit } from '@angular/core';
import { ScoreResultsService } from '../service/scoreResults/score-results.service';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event/event.service';
import { ScoreResultsResponse } from '../models/scoreResultsRespons';
import { eventRespons } from '../models/eventRespons';
import { Observable } from 'rxjs';
import { createParticipant, Ekvipage, Participant, ParticipantType, Single } from '../models/participant';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  results: ScoreResultsResponse[] = [];
  event!: eventRespons;

  transformedObject: any = {};

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

  transformObject(obj: any): any {
    // Extract required fields and restructure
    return  [
      {
      ExpandableTable: obj[0].values[0].competition.name,
      // level: obj[0].values[0].competition.level,
      // status: obj[0].values[0].competition.status,
      data: [
        {
        Nr: "1",
        Deltager: obj[0].values[0].participant.member.firstName + ' ' + obj[0].values[0].participant.member.lastName,
        Kanin: obj[0].values[0].participant.entity.name,
        Fejl: obj[0].values[0].faults,
        Tid: obj[0].values[0].time,                 
        // participationType: createParticipant(obj[0].values[0].participant),
        }
      ]
    }
    ];
  }
  
  fetchResultsByCompitionId(ids: string[]): void {
    this.scoreResultService.getResultsByIds(ids).subscribe({
        next: (data: any[]) => {
          console.log('Results fetched:', data[0].values[0].participant);
          this.transformedObject = this.transformObject(data);
          this.isLoading = false;
          console.log('Transformed object:', this.transformedObject);
      }
    });
  }

  
  fetchEvent(eventId: string): Observable<eventRespons> {
    return this.eventService.getEventById(eventId); // Assuming `getEventById` returns Observable<eventRespons>
  }
}