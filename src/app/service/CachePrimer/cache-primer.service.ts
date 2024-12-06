import { Injectable } from '@angular/core';
import { CompetitionService } from '../Competition/competition.service';
import { entityService } from '../entity/entity.service';
import { EventService } from '../event/event.service';
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
    private matchService: MatchService,
    private resultsService: ResultService,
  ) {}

  primeCache(): void {
    this.cacheCompetitions();
    this.cacheEntities();
    this.cacheEvents();
    this.cacheMatches();
    this.cacheResults();
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

  private cacheMatches(): void {
    this.matchService.getMatches().subscribe({
      next: (matches) => console.log('Matches cached:', matches),
      error: (err) => console.error('Failed to cache matches:', err.message),
    });
  }

  private cacheResults(): void {
    this.resultsService.getResult().subscribe({
      next: (results) => console.log('Results cached:', results),
      error: (err) => console.error('Failed to cache results:', err.message),
    });
  }
}
