import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, EMPTY } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { eventResponse } from '../../models/eventRespons';
import { API_DOMAIN } from '../apiUrl';
import { Status } from '../../models/enums';
import { eventRequest } from '../../models/eventRequest';
import { CompetitionResponse } from '../../models/competitionResponse';
import { CompetitionRequest } from '../../models/competitionRequest';
import { OfflineQueueService } from '../offlineQueue/offline-queue.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(
    private http: HttpClient,
    private offlineQueueService: OfflineQueueService
  ) {}

  private apiUrl = `${API_DOMAIN}/Events`;

  getEvents(): Observable<eventResponse[]> {
    return this.http.get<eventResponse[]>(this.apiUrl).pipe(
      catchError(this.handleError<eventResponse[]>('getEvents', [])) // Return empty array on error
    );
  }

  getEventById(id: string): Observable<eventResponse> {
    return this.http
      .get<eventResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError<eventResponse>(`getEventById id=${id}`))
      );
  }

  getEventsBySearchPending(): Observable<{
    values: eventResponse[];
    pageInfo: any;
  }> {
    const body = JSON.stringify({ status: 'Pending' });
    const headers = { 'Content-Type': 'application/json', Accept: '*/*' };

    return this.http
      .post<{ values: eventResponse[]; pageInfo: any }>(
        `${this.apiUrl}/search`,
        body,
        { headers }
      )
      .pipe(
        catchError(
          this.handleError<{ values: eventResponse[]; pageInfo: any }>(
            'getEventsBySearchPending'
          )
        )
      );
  }

  getEventsBySearchActive(): Observable<{
    values: eventResponse[];
    pageInfo: any;
  }> {
    const body = JSON.stringify({ status: 'Active' });
    const headers = { 'Content-Type': 'application/json', Accept: '*/*' };

    return this.http
      .post<{ values: eventResponse[]; pageInfo: any }>(
        `${this.apiUrl}/search`,
        body,
        { headers }
      )
      .pipe(
        catchError(
          this.handleError<{ values: eventResponse[]; pageInfo: any }>(
            'getEventsBySearchPending'
          )
        )
      );
  }

  getEventsBySearchCancelled(): Observable<{
    values: eventResponse[];
    pageInfo: any;
  }> {
    const body = JSON.stringify({ status: 'Cancelled' });
    const headers = { 'Content-Type': 'application/json', Accept: '*/*' };

    return this.http
      .post<{ values: eventResponse[]; pageInfo: any }>(
        `${this.apiUrl}/search`,
        body,
        { headers }
      )
      .pipe(
        catchError(
          this.handleError<{ values: eventResponse[]; pageInfo: any }>(
            'getEventsBySearchPending'
          )
        )
      );
  }

  getEventsBySearchConcluded(): Observable<{
    values: eventResponse[];
    pageInfo: any;
  }> {
    const body = JSON.stringify({ status: 'Concluded' });
    const headers = { 'Content-Type': 'application/json', Accept: '*/*' };

    return this.http
      .post<{ values: eventResponse[]; pageInfo: any }>(
        `${this.apiUrl}/search`,
        body,
        { headers }
      )
      .pipe(
        catchError(
          this.handleError<{ values: eventResponse[]; pageInfo: any }>(
            'getEventsBySearchPending'
          )
        )
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error to console
      return of(result as T); // Return a safe default result
    };
  }
  createEvent(event: eventRequest): Observable<eventRequest> {
    return this.http
      .post<eventRequest>(this.apiUrl, event)
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error creating event, saving to queue:', error);
          this.offlineQueueService.addToQueue(this.apiUrl, event, new HttpParams());
          return EMPTY;
        })
      );
  }

  addCompetititonToEvent(
    eventId: eventRequest,
    competitionId: CompetitionRequest
  ) {
    return this.http
      .post(`${this.apiUrl}/${eventId}addCompetition/${competitionId}`, null)
      .pipe(map((response) => response));
  }
}
