import { Injectable } from '@angular/core';
import { CompetitionService } from '../Competition/competition.service';
import { entityService } from '../entity/entity.service';
import { EventService } from '../event/event.service';
import { MatchService } from '../match/match.service';
import { ResultService } from '../Result/result.service';
import { LocationService } from '../location/location.service';
import { OrganizerService } from '../organizerService/organizer.service';
import { CompetitionTypeService } from '../CompetitionType/competition-type.service';
import { JudgeService } from '../judge/judge.service';

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
    private locationService: LocationService,
    private organizerService: OrganizerService,
    private competitiontypeService: CompetitionTypeService,
    private judgeService: JudgeService
  ) {}

  primeCache(): void {
    this.cacheCompetitions();
    this.cacheEntities();
    this.cacheEvents();
    this.cacheMatches();
    this.cacheResults();
    this.cacheLocations();
    this.cacheOrganizers();
    this.cacheCompetitionTypes();
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

  private cacheLocations(): void {
    this.locationService.getLocation().subscribe({
      next: (locations) => console.log('Locations cached:', locations),
      error: (err) => console.error('Failed to cache locations:', err.message),
    });
  }

  private cacheOrganizers(): void {
    this.organizerService.getOrganizer().subscribe({
      next: (organizers) => console.log('Organizers cached:', organizers),
      error: (err) => console.error('Failed to cache organizers:', err.message),
    });
  }

  private cacheCompetitionTypes(): void {
    this.competitiontypeService.getCompetitionType().subscribe({
      next: (competitionTypes) => console.log('Competition types cached:', competitionTypes),
      error: (err) => console.error('Failed to cache competition types:', err.message),
    });
  }

  private cacheJudges(): void {
    this.judgeService.getJudge().subscribe({
      next: (judges) => console.log('Judges cached:', judges),
      error: (err) => console.error('Failed to cache judges:', err.message),
    });
  }
}
