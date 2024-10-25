import { Component } from '@angular/core';
import { Event } from '../../models/event'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent {
  events = [
    { id: 1, date: new Date('2024-10-15'), creator: 'Vejle kanin avlar forenening for unge', name: 'Angular Workshop' },
    { id: 1, date: new Date('2024-10-15'), creator: 'John Doe', name: 'Angular Workshop' },
    { id: 2, date: new Date('2024-1-15'), creator: 'John Doe', name: 'Angular Workshop' },
    { id: 3, date: new Date('2024-5-15'), creator: 'John Doe', name: 'Angular Workshop' },
    { id: 4, date: new Date('2025-07-15'), creator: 'John Doe', name: 'Angular Workshop' },
    { id: 5, date: new Date('2024-12-05'), creator: 'Jane Smith', name: 'TypeScript Conference' },
    // More events
  ];
  
  groupedEvents = this.groupEventsByMonth(this.events);

  groupEventsByMonth(events: Event[]): [string, Event[]][] {
    // Group events by month and year
    const groupedEvents: { [key: string]: Event[] } = events.reduce((groups, event) => {
      const eventDate = new Date(event.date);
      const monthYear = eventDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
  
      groups[monthYear].push(event);
      return groups;
    }, {} as { [key: string]: Event[] });
  
    // Sort the events by date within each month-year group
    Object.keys(groupedEvents).forEach(monthYear => {
      groupedEvents[monthYear].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  
    return Object.entries(groupedEvents) as [string, Event[]][];
  }
}