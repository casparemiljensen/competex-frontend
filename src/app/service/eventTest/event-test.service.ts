import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { eventRespons } from '../../models/eventRespons';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://competex.schnykjaer.com:22114/api/Events'; 

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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log to console or a logging service
      return of(result as T); // Return a safe fallback value
    };
  }
}
