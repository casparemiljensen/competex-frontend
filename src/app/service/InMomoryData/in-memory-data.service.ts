import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Event } from '../../models/event'
import { V } from '@angular/cdk/keycodes';
import { partition } from 'rxjs';

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

    const judge = [
      { 
        judge: "Judges",
        data: [
          { name: "Peter"},
          { name: "John"},
          { name: "Michael"},
          { name: "Jens"},
          { name: "Hans"},
          { name: "Christian"},
          { name: "Thomas"},
          { name: "Lars"}
        ]
      }
    ];

    const ExpandableTables = [
      {
        ExpandableTable: "Boys U12 Football",
        status: "Start", // Added status
        data: [
          { club: "Tigers", players: 11, coach: 'John Doe' },
          { club: "Hawks", players: 12, coach: 'Jane Smith' },
          { club: "Lions", players: 13, coach: 'Jim Brown' },
          { club: "Tigers", players: 11, coach: 'John Doe' },
          { club: "Hawks", players: 12, coach: 'Jane Smith' },
          { club: "Lions", players: 13, coach: 'Jim Brown' },
          { club: "Tigers", players: 11, coach: 'John Doe' },
          { club: "Hawks", players: 12, coach: 'Jane Smith' },
          { club: "Lions", players: 13, coach: 'Jim Brown' },
          { club: "Tigers", players: 11, coach: 'John Doe' },
          { club: "Hawks", players: 12, coach: 'Jane Smith' },
          { club: "Lions", players: 13, coach: 'Jim Brown' },
          { club: "Tigers", players: 11, coach: 'John Doe' },
          { club: "Hawks", players: 12, coach: 'Jane Smith' },
          { club: "Lions", players: 13, coach: 'Jim Brown' },
          { club: "Tigers", players: 11, coach: 'John Doe' },
          { club: "Hawks", players: 12, coach: 'Jane Smith' },
          { club: "Lions", players: 13, coach: 'Jim Brown' },
          { club: "Tigers", players: 11, coach: 'John Doe' },
          { club: "Hawks", players: 12, coach: 'Jane Smith' },
          { club: "Lions", players: 13, coach: 'Jim Brown' },
          { club: "Tigers", players: 11, coach: 'John Doe' },
          { club: "Hawks", players: 12, coach: 'Jane Smith' },
          { club: "Lions", players: 13, coach: 'Jim Brown' },
          { club: "Tigers", players: 11, coach: 'John Doe' },
          { club: "Hawks", players: 12, coach: 'Jane Smith' },
          { club: "Lions", players: 13, coach: 'Jim Brown' },
          { club: "Tigers", players: 11, coach: 'John Doe' },
          { club: "Hawks", players: 12, coach: 'Jane Smith' },
          { club: "Lions", players: 13, coach: 'Jim Brown' }
        ]
      },
      {
        ExpandableTable: "Girls U15 Volleyball",
        status: "Aktiv", // Added status
        data: [
          { team: "Spikers", members: 10, manager: 'Alice Johnson' },
          { team: "Blockers", members: 9, manager: 'Billie Jean' },
          { team: "Diggers", members: 11, manager: 'Carl Kicks' }
        ]
      },
      {
        ExpandableTable: "Mixed U18 Basketball",
        status: "Afsluttet", // Added status
        data: [
          { squad: "Shooters", athletes: 5, trainer: 'Mike Bane' },
          { squad: "Dribblers", athletes: 6, trainer: 'Sarah Conner' },
          { squad: "Jumpers", athletes: 5, trainer: 'Donnie Darko' }
        ]
      },
      {
        ExpandableTable: "Open Swimming 100m",
        status: "Start", // Added status
        data: [
          { club: "Wave Riders", swimmers: 4, coach: 'Lana Kane' },
          { club: "Speedsters", swimmers: 5, coach: 'Archer Sterling' },
          { club: "Aqua Flyers", swimmers: 3, coach: 'Cyril Figgis' }
        ]
      },
      {
        ExpandableTable: "Youth Chess Tournament",
        status: "Aktiv", // Added status
        data: [
          { club: "Check Mates", players: 8, coordinator: 'Ray Gillette' },
          { club: "Kings & Queens", players: 7, coordinator: 'Pam Poovey' },
          { club: "Bishop Battlers", players: 6, coordinator: 'Cheryl Tunt' }
        ]
      }
    ];

    const result = [
      {
        ExpandableTable: "Konkurrence navn - Bed m.",
        judge: "Ray Ray",
        data: [
          {
            Nr: 1,
            Handler: "Rasmus",
            Rabbit: "Kaninnavn Kaninnavn ",
            Fejl_1: "10+1+1",
            Tid_1: "1:02:35",
            Fejl_2: "10+1+1",
            Tid_2: "1:05:40",
            T_Fejl: 12,
            T_Tid: "2:08:15",
            Pind: "x"
          },
          {
            Nr: 2,
            Handler: "Lars",
            Rabbit: "Kaninnavn 2",
            Fejl_1: "5+2",
            Tid_1: "0:58:10",
            Fejl_2: "6+3",
            Tid_2: "1:00:20",
            T_Fejl: 10,
            T_Tid: "1:58:30",
            Pind: "-"
          },
          {
            Nr: 3,
            Handler: "Sofie",
            Rabbit: "Kaninnavn 3",
            Fejl_1: "8+1",
            Tid_1: "1:10:45",
            Fejl_2: "9+1",
            Tid_2: "1:08:30",
            T_Fejl: 10,
            T_Tid: "2:19:15",
            Pind: "x"
          }
        ]
      },
      {
        ExpandableTable: "Konkurrence navn - Spring m.",
        judge: "Sandy Dee",
        data: [
          {
            Nr: 1,
            Handler: "Mikkel",
            Rabbit: "Kaninnavn A",
            Fejl_1: "7+1",
            Tid_1: "1:05:10",
            Fejl_2: "6+2",
            Tid_2: "1:03:20",
            T_Fejl: 8,
            T_Tid: "2:08:30",
            Pind: "x"
          },
          {
            Nr: 2,
            Handler: "Anna",
            Rabbit: "Kaninnavn B",
            Fejl_1: "3+4",
            Tid_1: "0:55:20",
            Fejl_2: "4+3",
            Tid_2: "0:57:45",
            T_Fejl: 7,
            T_Tid: "1:53:05",
            Pind: "-"
          },
          {
            Nr: 3,
            Handler: "Jens",
            Rabbit: "Kaninnavn C",
            Fejl_1: "5+2+1",
            Tid_1: "1:02:25",
            Fejl_2: "6+1",
            Tid_2: "1:04:50",
            T_Fejl: 9,
            T_Tid: "2:07:15",
            Pind: "x"
          }
        ]
      }
    ];

    return { events, ExpandableTables, judge, result};
  }

  // genId(event: Event[]): number {
  //   return event.length > 0 ? Math.max(...event.map(event => event.id)) + 1 : 11
  // }
}
