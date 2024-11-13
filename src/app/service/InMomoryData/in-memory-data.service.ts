import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Event } from '../../models/event'
import { V } from '@angular/cdk/keycodes';

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
        data: [
          { team: "Spikers", members: 10, manager: 'Alice Johnson' },
          { team: "Blockers", members: 9, manager: 'Billie Jean' },
          { team: "Diggers", members: 11, manager: 'Carl Kicks' }
        ]
      },
      {
        ExpandableTable: "Mixed U18 Basketball",
        data: [
          { squad: "Shooters", athletes: 5, trainer: 'Mike Bane' },
          { squad: "Dribblers", athletes: 6, trainer: 'Sarah Conner' },
          { squad: "Jumpers", athletes: 5, trainer: 'Donnie Darko' }
        ]
      },
      {
        ExpandableTable: "Open Swimming 100m",
        data: [
          { club: "Wave Riders", swimmers: 4, coach: 'Lana Kane' },
          { club: "Speedsters", swimmers: 5, coach: 'Archer Sterling' },
          { club: "Aqua Flyers", swimmers: 3, coach: 'Cyril Figgis' }
        ]
      },
      {
        ExpandableTable: "Youth Chess Tournament",
        data: [
          { club: "Check Mates", players: 8, coordinator: 'Ray Gillette' },
          { club: "Kings & Queens", players: 7, coordinator: 'Pam Poovey' },
          { club: "Bishop Battlers", players: 6, coordinator: 'Cheryl Tunt' }
        ]
      }
    ];

    const result = [
      {
        competition_name: "Konkurrence navn - Bed m.",
        judge: "Ray Ray",
        participants: [
          {
            number: 1,
            participant_name: {
              rabbit_name: "Kaninnavn 1",
              handler_name: "Førernavn 1"
            },
            scores: [
              {
                fejl_1: "10+1+1",
                time_1: "1:02:35",
                fejl_2: "10+1+1",
                time_2: "1:05:40",
                total_fejl: 12,
                total_time: "2:08:15",
                pind: "x"
              }
            ]
          },
          {
            number: 2,
            participant_name: {
              rabbit_name: "Kaninnavn 2",
              handler_name: "Førernavn 2"
            },
            scores: [
              {
                fejl_1: "5+2",
                time_1: "0:58:10",
                fejl_2: "6+3",
                time_2: "1:00:20",
                total_fejl: 10,
                total_time: "1:58:30",
                pind: "-"
              }
            ]
          },
          {
            number: 3,
            participant_name: {
              rabbit_name: "Kaninnavn 3",
              handler_name: "Førernavn 3"
            },
            scores: [
              {
                fejl_1: "8+1",
                time_1: "1:10:45",
                fejl_2: "9+1",
                time_2: "1:08:30",
                total_fejl: 10,
                total_time: "2:19:15",
                pind: "x"
              }
            ]
          }
        ]
      },
      {
        competition_name: "Konkurrence navn - Spring m.",
        judge: "Sandy Dee",
        participants: [
          {
            number: 1,
            participant_name: {
              rabbit_name: "Kaninnavn A",
              handler_name: "Førernavn A"
            },
            scores: [
              {
                fejl_1: "7+1",
                time_1: "1:05:10",
                fejl_2: "6+2",
                time_2: "1:03:20",
                total_fejl: 8,
                total_time: "2:08:30",
                pind: "x"
              }
            ]
          },
          {
            number: 2,
            participant_name: {
              rabbit_name: "Kaninnavn B",
              handler_name: "Førernavn B"
            },
            scores: [
              {
                fejl_1: "3+4",
                time_1: "0:55:20",
                fejl_2: "4+3",
                time_2: "0:57:45",
                total_fejl: 7,
                total_time: "1:53:05",
                pind: "-"
              }
            ]
          },
          {
            number: 3,
            participant_name: {
              rabbit_name: "Kaninnavn C",
              handler_name: "Førernavn C"
            },
            scores: [
              {
                fejl_1: "5+2+1",
                time_1: "1:02:25",
                fejl_2: "6+1",
                time_2: "1:04:50",
                total_fejl: 9,
                total_time: "2:07:15",
                pind: "x"
              }
            ]
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
