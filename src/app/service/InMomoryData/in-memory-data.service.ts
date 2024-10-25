import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Event } from '../../models/event'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb( ) {
    const Event = [
      { id: 1, date: new Date('2024-11-19 15:35:26.430870'), creator: 'Odense Løbeklub', name: 'Ski Trip' },
      { id: 2, date: new Date('2024-12-25 15:35:26.430905'), creator: 'Frederikshavn Badmintonklub', name: 'Handball Championship' },
      { id: 3, date: new Date('2025-03-12 15:35:26.430912'), creator: 'Sønderborg Golfklub', name: 'Badminton Cup' },
      { id: 4, date: new Date('2025-05-07 15:35:26.430918'), creator: 'Vejle Kanin Avler Forening for Unge', name: 'Football Tournament' },
      { id: 5, date: new Date('2025-09-28 15:35:26.430924'), creator: 'Aarhus Fodboldklub', name: 'Swimming Gala' },
      { id: 6, date: new Date('2025-03-03 15:35:26.430929'), creator: 'København Håndboldforening', name: 'Drone Racing Showdown' },
      { id: 7, date: new Date('2025-06-28 15:35:26.430933'), creator: 'København Håndboldforening', name: 'Handball Championship' },
      { id: 8, date: new Date('2025-09-30 15:35:26.430938'), creator: 'Esbjerg Svømmeklub', name: 'Badminton Cup' },
      { id: 9, date: new Date('2025-07-28 15:35:26.430947'), creator: 'Horsens Tennisforening', name: 'Angular Workshop' },
      { id: 10, date: new Date('2025-08-24 15:35:26.430952'), creator: 'Esbjerg Svømmeklub', name: 'Angular Workshop' },
      { id: 11, date: new Date('2025-05-22 15:35:26.430955'), creator: 'Sønderborg Golfklub', name: 'Tennis Open' },
      { id: 12, date: new Date('2025-10-08 15:35:26.430959'), creator: 'Esbjerg Svømmeklub', name: 'Tennis Open' },
      { id: 13, date: new Date('2025-08-25 15:35:26.430963'), creator: 'Vejle Kanin Avler Forening for Unge', name: 'Golf Masters' },
      { id: 14, date: new Date('2025-02-26 15:35:26.430968'), creator: 'Silkeborg Skiklub', name: 'Swimming Gala' },
      { id: 15, date: new Date('2024-11-25 15:35:26.430973'), creator: 'Odense Løbeklub', name: 'Ski Trip' },
      { id: 16, date: new Date('2025-01-12 15:35:26.430979'), creator: 'Vejle Kanin Avler Forening for Unge', name: 'Annual Marathon' },
      { id: 17, date: new Date('2025-04-13 15:35:26.430984'), creator: 'København Håndboldforening', name: 'Badminton Cup' },
      { id: 18, date: new Date('2024-11-11 15:35:26.430990'), creator: 'Frederikshavn Badmintonklub', name: 'Ski Trip' },
      { id: 19, date: new Date('2025-07-09 15:35:26.430996'), creator: 'Esbjerg Svømmeklub', name: 'Ski Trip' },
      { id: 20, date: new Date('2024-12-08 15:35:26.431000'), creator: 'København Håndboldforening', name: 'Golf Masters' },
    ];
    return Event;
  }

  genId(event: Event[]): number {
    return event.length > 0 ? Math.max(...event.map(event => event.id)) + 1 : 11
  }
}
