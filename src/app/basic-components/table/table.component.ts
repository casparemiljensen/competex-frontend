import { Component, OnInit } from '@angular/core';
import { EventService } from '../../service/event/event.service';
import { Event } from '../../models/event'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit {

  events: Event[] = [];
  groupedEvents: [string, Event[]][] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.groupedEvents = this.groupEventsByMonth(this.events);
    });
  }

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