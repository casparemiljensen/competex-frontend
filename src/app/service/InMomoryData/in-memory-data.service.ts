import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Event } from '../../models/event'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const events: Event[] = [
      { id:  1, date: new Date('2024-11-19'), creator: 'Odense Løbeklub', name: 'Ski Trip' },
      { id:  2, date: new Date('2024-12-25'), creator: 'Frederikshavn Badmintonklub', name: 'Handball Championship' },
      { id:  3, date: new Date('2025-03-12'), creator: 'Sønderborg Golfklub', name: 'Badminton Cup' },
      { id:  4, date: new Date('2025-05-07'), creator: 'Vejle Kanin Avler Forening for Unge', name: 'Football Tournament' },
      { id:  5, date: new Date('2025-09-28'), creator: 'Aarhus Fodboldklub', name: 'Swimming Gala' },
      { id:  6, date: new Date('2025-03-03'), creator: 'København Håndboldforening', name: 'Drone Racing Showdown' },
      { id:  7, date: new Date('2025-06-28'), creator: 'København Håndboldforening', name: 'Handball Championship' },
      { id:  8, date: new Date('2025-09-30'), creator: 'Esbjerg Svømmeklub', name: 'Badminton Cup' },
      { id:  9, date: new Date('2025-07-28'), creator: 'Horsens Tennisforening', name: 'Angular Workshop' },
      { id: 10, date: new Date('2025-08-24'), creator: 'Esbjerg Svømmeklub', name: 'Angular Workshop' },
      { id: 11, date: new Date('2025-05-22'), creator: 'Sønderborg Golfklub', name: 'Tennis Open' },
      { id: 12, date: new Date('2025-10-08'), creator: 'Esbjerg Svømmeklub', name: 'Tennis Open' },
      { id: 13, date: new Date('2025-08-25'), creator: 'Vejle Kanin Avler Forening for Unge', name: 'Golf Masters' },
      { id: 14, date: new Date('2025-02-26'), creator: 'Silkeborg Skiklub', name: 'Swimming Gala' },
      { id: 15, date: new Date('2024-11-25'), creator: 'Odense Løbeklub', name: 'Ski Trip' },
      { id: 16, date: new Date('2025-01-12'), creator: 'Vejle Kanin Avler Forening for Unge', name: 'Annual Marathon' },
      { id: 17, date: new Date('2025-04-13'), creator: 'København Håndboldforening', name: 'Badminton Cup' },
      { id: 18, date: new Date('2024-11-11'), creator: 'Frederikshavn Badmintonklub', name: 'Ski Trip' },
      { id: 19, date: new Date('2025-07-09'), creator: 'Esbjerg Svømmeklub', name: 'Ski Trip' },
      { id: 20, date: new Date('2024-12-08'), creator: 'København Håndboldforening', name: 'Golf Masters' },
    ];

    const competitions = [
      { id: 1, name: 'Competition 1', date: '2023-01-01', location: 'Location 1' },
      { id: 2, name: 'Competition 2', date: '2023-02-01', location: 'Location 2' },
      { id: 3, name: 'Competition 3', date: '2023-03-01', location: 'Location 3' },
      { id: 4, name: 'Competition 4', date: '2023-04-01', location: 'Location 4' },
      { id: 5, name: 'Competition 5', date: '2023-05-01', location: 'Location 5' },
      // Add more mock competitions as needed
    ];

    return { events, competitions };
  }

  // genId(event: Event[]): number {
  //   return event.length > 0 ? Math.max(...event.map(event => event.id)) + 1 : 11
  // }
}
