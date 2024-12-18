import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, forkJoin, EMPTY } from 'rxjs';
import { CompetitionRequest } from '../../models/competitionRequest';
import { CompetitionResponse } from '../../models/competitionResponse';
import { API_DOMAIN } from '../apiUrl';
import { catchError } from 'rxjs/operators';
import { OfflineQueueService } from '../offlineQueue/offline-queue.service';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  private baseUrl = `${API_DOMAIN}/Competitions`; // backend URL

  constructor(
    private http: HttpClient,
    private offlineQueueService: OfflineQueueService
  ) {}

  // Fetch competitions
  getCompetitions(): Observable<CompetitionResponse[]> {
    return this.http
      .get<{ values: CompetitionResponse[] }>(this.baseUrl)
      .pipe(map((response) => response.values));
  }

  // Fetch a single competition by ID
  getCompetitionById(id: string): Observable<CompetitionResponse> {
    return this.http
      .get<CompetitionResponse>(`${this.baseUrl}/${id}`)
      .pipe(map((response) => response));
  }
  createCompetition(event: CompetitionRequest): Observable<CompetitionRequest> {
    return this.http.post<CompetitionRequest>(this.baseUrl, event).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error creating competition, saving to queue:', error);

        this.offlineQueueService.addToQueue(
          this.baseUrl,
          event,
          new HttpParams()
        );
        return EMPTY;
      })
    );
  }

  getCompetitionsByIds(ids: string[]): Observable<CompetitionResponse[]> {
    const requests = ids.map((id) =>
      this.http.get<CompetitionResponse>(`${this.baseUrl}/${id}`)
    );

    return forkJoin(requests); // Combine all requests
  }

  getCompetitionSearch(search: {
    [key: string]: any;
  }): Observable<CompetitionResponse[]> {
    return this.http
      .post<{ values: CompetitionResponse[] }>(`${this.baseUrl}/search`, search)
      .pipe(map((response) => response.values));
  }

  updateCompetition(competition: CompetitionRequest): Observable<string> {
    return this.http
      .put<string>(`${this.baseUrl}/${competition.id}`, competition)
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error updating competition, saving to queue:', error);

          this.offlineQueueService.addToQueue(
            `${this.baseUrl}/${competition.id}`,
            competition,
            new HttpParams()
          );
          return EMPTY;
        })
      );
  }
}
