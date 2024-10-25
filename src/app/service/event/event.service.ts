import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_EVENTS } from '../../mock-data/mock-events';
import { Event } from '../../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  getEvents(): Observable<Event[]>{
    console.log("fetching mock data", MOCK_EVENTS)
    return of(MOCK_EVENTS)
  }
}
