import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_EVENTS } from '../../mock-data/mock-events';
import { Event } from '../../models/event';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  private eventsUrl = 'api/events'; 

  getEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(this.eventsUrl)
  }
}
