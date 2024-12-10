import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { eventRespons } from '../../models/eventRespons';
import { API_DOMAIN } from '../apiUrl';
import { Status } from '../../models/enums';
import { eventRequest } from '../../models/eventRequest';
import { CompetitionResponse } from '../../models/competitionResponse';
import { CompetitionRequest } from '../../models/competitionRequest';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${API_DOMAIN}/Events`;

  getEvents(): Observable<eventRespons[]> {
    return this.http.get<eventRespons[]>(this.apiUrl).pipe(
      catchError(this.handleError<eventRespons[]>('getEvents', [])) // Return empty array on error
    );
  }

  getEventById(id: string): Observable<eventRespons> {
    return this.http
      .get<eventRespons>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError<eventRespons>(`getEventById id=${id}`))
      );
  }

  getEventsBySearchPending(): Observable<{
    values: eventRespons[];
    pageInfo: any;
  }> {
    const body = JSON.stringify({ status: 'Pending' });
    const headers = { 'Content-Type': 'application/json', Accept: '*/*' };

    return this.http
      .post<{ values: eventRespons[]; pageInfo: any }>(
        `${this.apiUrl}/search`,
        body,
        { headers }
      )
      .pipe(
        catchError(
          this.handleError<{ values: eventRespons[]; pageInfo: any }>(
            'getEventsBySearchPending'
          )
        )
      );
  }

  getEventsBySearchActive(): Observable<{
    values: eventRespons[];
    pageInfo: any;
  }> {
    const body = JSON.stringify({ status: 'Active' });
    const headers = { 'Content-Type': 'application/json', Accept: '*/*' };

    return this.http
      .post<{ values: eventRespons[]; pageInfo: any }>(
        `${this.apiUrl}/search`,
        body,
        { headers }
      )
      .pipe(
        catchError(
          this.handleError<{ values: eventRespons[]; pageInfo: any }>(
            'getEventsBySearchPending'
          )
        )
      );
  }

  getEventsBySearchCancelled(): Observable<{
    values: eventRespons[];
    pageInfo: any;
  }> {
    const body = JSON.stringify({ status: 'Cancelled' });
    const headers = { 'Content-Type': 'application/json', Accept: '*/*' };

    return this.http
      .post<{ values: eventRespons[]; pageInfo: any }>(
        `${this.apiUrl}/search`,
        body,
        { headers }
      )
      .pipe(
        catchError(
          this.handleError<{ values: eventRespons[]; pageInfo: any }>(
            'getEventsBySearchPending'
          )
        )
      );
  }

  getEventsBySearchConcluded(): Observable<{
    values: eventRespons[];
    pageInfo: any;
  }> {
    const body = JSON.stringify({ status: 'Concluded' });
    const headers = { 'Content-Type': 'application/json', Accept: '*/*' };

    return this.http
      .post<{ values: eventRespons[]; pageInfo: any }>(
        `${this.apiUrl}/search`,
        body,
        { headers }
      )
      .pipe(
        catchError(
          this.handleError<{ values: eventRespons[]; pageInfo: any }>(
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
      .pipe(map((response) => response));
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
