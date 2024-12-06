import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { MOCK_EVENTS } from '../../mock-data/mock-events';
import { Event } from '../../models/event';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_DOMAIN } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class EventService {

    constructor(private http: HttpClient) { }

  
    private apiUrl = `${API_DOMAIN}api/events`; 


    getEvents(): Observable<Event[]> {
      return this.http.get<Event[]>(this.apiUrl)
        .pipe(
          catchError(this.handleError<Event[]>('getEvents', []))
        );
    }

  getEventById(id: number): Observable<Event | undefined> {
    return this.getEvents().pipe(
      map((events: Event[]) => events.find((event) => event.id === id))
    );
  }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        return of(result as T);
      };
    }
}
