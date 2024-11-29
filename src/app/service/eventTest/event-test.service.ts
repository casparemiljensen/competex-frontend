import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { eventRespons } from '../../models/eventRespons';
import { API_DOMAIN } from '../apiUrl';
import { Status } from '../../models/enums'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${API_DOMAIN}api/Events`; 

  getEvents(): Observable<eventRespons[]> {
    return this.http.get<eventRespons[]>(this.apiUrl).pipe(
      catchError(this.handleError<eventRespons[]>('getEvents', [])) // Return empty array on error
    );
  }
  
  getEventById(id: string): Observable<eventRespons> {
    return this.http.get<eventRespons>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<eventRespons>(`getEventById id=${id}`))
    );
  }

  getEventsBySearchPending(): Observable<any[]> {
    const body = JSON.stringify({ status: 'Pending' }); // JSON body
    const headers = { 'Content-Type': 'application/json', Accept: '*/*' }; // Optional headers from cURL
    return this.http.post<any[]>(`${this.apiUrl}/search`, body, {headers}).pipe(
      catchError(this.handleError<any[]>('getEventsBySearchPending'))
    );
  }

  getEventsBySearcActive(): Observable<eventRespons> {
    console.log("this is the pending" + Status.Pending);
    return this.http.get<eventRespons>(`${this.apiUrl}/${Status.Active}`).pipe(
      catchError(this.handleError<eventRespons>(`getEventBySearch status=${Status.Active}`))
    );
  }

  getEventsBySearcCancelled(): Observable<eventRespons> {
    return this.http.get<eventRespons>(`${this.apiUrl}/${Status.Cancelled}`).pipe(
      catchError(this.handleError<eventRespons>(`getEventBySearch status=${Status.Cancelled}`))
    );
  }

  getEventsBySearcConcluded(): Observable<eventRespons> {
    return this.http.get<eventRespons>(`${this.apiUrl}/${Status.Concluded}`).pipe(
      catchError(this.handleError<eventRespons>(`getEventBySearch status=${Status.Concluded}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log to console or a logging service
      return of(result as T); // Return a safe fallback value
    };
  }
}
