import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { eventRespons } from '../../models/eventRespons';
import { eventRequest } from '../../models/eventRequest';
import { API_DOMAIN } from '../apiUrl';
import { Status } from '../../models/enums';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${API_DOMAIN}api/Events`;

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

  getEventsBySearchPendingtest(): Observable<eventRespons> {
    console.log('this is the pending' + Status.Pending);

    // return this.http.get<eventRespons>(`${this.apiUrl}/${Status.Active}`).pipe(
    //   catchError(this.handleError<eventRespons>(`getEventBySearch status=${Status.Active}`))
    // );

    return this.http
      .get<eventRespons>(`${this.apiUrl}/Pendingw`)
      .pipe(
        catchError(
          this.handleError<eventRespons>(
            `getEventBySearch status=${Status.Active}`
          )
        )
      );
  }

  getEventsBySearcCancelled(): Observable<eventRespons> {
    return this.http
      .get<eventRespons>(`${this.apiUrl}/${Status.Cancelled}`)
      .pipe(
        catchError(
          this.handleError<eventRespons>(
            `getEventBySearch status=${Status.Cancelled}`
          )
        )
      );
  }

  getEventsBySearcConcluded(): Observable<eventRespons> {
    return this.http
      .get<eventRespons>(`${this.apiUrl}/${Status.Concluded}`)
      .pipe(
        catchError(
          this.handleError<eventRespons>(
            `getEventBySearch status=${Status.Concluded}`
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
}
