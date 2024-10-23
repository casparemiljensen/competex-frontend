import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  displayedColumns: string[] = ['date', 'creator', 'eventName'];
  groupedEvents = this.groupEventsByMonth(EVENT_DATA);

  // Function to group events by month
  groupEventsByMonth(events: EventData[]): { month: string, events: EventData[] }[] {
    const grouped: { [key: string]: EventData[] } = {};

    events.forEach(event => {
      const monthYear = event.date.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(event);
    });

    return Object.keys(grouped).map(month => ({ month, events: grouped[month] }));
  }
}

const EVENT_DATA: EventData[] = [
  { date: new Date(2024, 9, 1), creator: 'John Doe', eventName: 'Angular Conference' }, // October
  { date: new Date(2024, 9, 15), creator: 'Jane Smith', eventName: 'Tech Expo' },      // October
  { date: new Date(2024, 10, 5), creator: 'Michael Brown', eventName: 'Web Summit' },   // November
  { date: new Date(2024, 10, 22), creator: 'Lisa White', eventName: 'AI Meetup' }       // November
];

export interface EventData {
  date: Date;
  creator: string;
  eventName: string;
}