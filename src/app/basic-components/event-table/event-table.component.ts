import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService } from '../../service/event/event.service';
import { eventResponse } from '../../models/eventRespons';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css'],
})
export class EventTableComponent implements OnInit {
  events$: Observable<eventResponse[]> | undefined; // Observable to hold event data
  groupedEvents: [string, eventResponse[]][] = [];
  isLoading = true;

  // Inject the EventService
  constructor(private eventService: EventService) {}

  // Use Angular's lifecycle hook to fetch events on component initialization
  ngOnInit(): void {
    this.fetchPendingEvents();
    this.isLoading = false;
  }

  fetchPendingEvents(): any {
    this.eventService.getEventsBySearchPending().subscribe((apiData) => {
      if(apiData){
        const events = this.mapApiDataToEvents(apiData);
        this.groupedEvents = this.groupEventsByMonth(events);
        this.isLoading = false;
        return events;
      } else {
        this.isLoading = false;
        console.log("No pending events")
        return [];
      }
    });
  }

  mapApiDataToEvents(apiData: any): eventResponse[] {
    return apiData.values.map((value: any) => ({
      id: value.id,
      title: value.title,
      description: value.description,
      startDate: new Date(value.startDate),
      endDate: new Date(value.endDate),
      location: `${value.location.name}, ${value.location.city}, ${value.location.country}`,
      creator: value.organizer,
    }));
  }

  groupEventsByMonth(events: eventResponse[]): [string, eventResponse[]][] {
    const groupedEvents: { [key: string]: eventResponse[] } = events.reduce(
      (groups, event: eventResponse) => {
        const eventDate = event.startDate;
        const monthYear = eventDate.toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        });

        if (!groups[monthYear]) {
          groups[monthYear] = [];
        }

        groups[monthYear].push(event);
        return groups;
      },
      {} as { [key: string]: eventResponse[] }
    );

    // Sort the events by date within each month-year group
    Object.keys(groupedEvents).forEach((monthYear) => {
      groupedEvents[monthYear].sort(
        (a, b) => a.startDate.getTime() - b.startDate.getTime()
      );
    });

    return Object.entries(groupedEvents) as [string, eventResponse[]][];
  }
}
