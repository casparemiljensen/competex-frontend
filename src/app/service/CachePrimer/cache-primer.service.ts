import { Injectable } from '@angular/core';
import { CompetitionService } from '../Competition/competition.service';
import { entityService } from '../entity/entity.service';
import { EventService } from '../eventTest/event-test.service';
import { EventPageService } from '../event-page/event-page.service';
import { MatchService } from '../match/match.service';
import { ResultService } from '../Result/result.service';

@Injectable({
  providedIn: 'root'
})
export class CachePrimerService {
  constructor(
    private competitionService: CompetitionService, 
    private entityService: entityService,
    private eventService: EventService,
    private eventpageService: EventPageService,
    private matchService: MatchService,
    private resultsService: ResultService,
  ) {}

  primeCache(): void {
    this.cacheCompetitions();
    this.cacheEntities();
    this.cacheEvents();
    this.cacheEventPageData();
    // this.cacheResults();
  }

  private cacheCompetitions(): void {
    this.competitionService.getCompetitions().subscribe({
      next: (competitions) => console.log('Competitions cached:', competitions),
      error: (err) => console.error('Failed to cache competitions:', err.message),
    });
  }

  private cacheEntities(): void {
    this.entityService.getEntities().subscribe({
      next: (entities) => console.log('Entities cached:', entities),
      error: (err) => console.error('Failed to cache entities:', err.message),
    });
  }

  private cacheEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => console.log('Events cached:', events),
      error: (err) => console.error('Failed to cache events:', err.message),
    });
  }

  private cacheEventPageData(): void {
    this.eventpageService.getJudge().subscribe({
      next: (judges) => console.log('Judges cached:', judges),
      error: (err) => console.error('Failed to cache judges:', err.message),
    });
  }

  // private cacheResults(): void {
  //   this.resultsService.getResult().subscribe({
  //     next: (results) => console.log('Results cached:', results),
  //     error: (err) => console.error('Failed to cache results:', err.message),
  //   });
  // }
}
