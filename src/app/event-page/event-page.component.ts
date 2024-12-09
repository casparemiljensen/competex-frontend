import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { eventRespons } from '../models/eventRespons';
import { EventService } from '../service/event/event.service';
import { CompetitionService } from '../service/Competition/competition.service';
import { CompetitionResponse } from '../models/competitionResponse';
import { map, Observable } from 'rxjs';
import { RegistrationService } from '../service/registration/registration.service';
import { RegistrationRespons } from '../models/registrationRespons';
import { createParticipant, Ekvipage, Single, Team } from '../models/participant';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css',
})
export class EventPageComponent implements OnInit {
  event!: eventRespons;
  isLoading = true;
  transformData: any[] = [];

  // This is the tempory, to show how the pange changes give the view is creator of the event or not
  isCreator = true;
  transformedData: any[] | undefined;

  constructor(
    private EventService: EventService,
    private RegistrationService: RegistrationService,
    private CompetitionService: CompetitionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const eventId = params.get('eventId');
      console.log('Event ID:', eventId);
      if (eventId) {
        this.fetchEvent(eventId).subscribe({
          next: (event: eventRespons) => {
            this.event = event;
            const competitionIds = this.event.competitions.map((comp) => comp.id);
            console.log('Competition IDs:', competitionIds);
  
            // Fetch and process registrations for all competition IDs
            this.processAllCompetitions(competitionIds);
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error fetching event:', err);
            this.isLoading = false;
          },
        });
      } else {
        console.warn('No event ID provided in route.');
        this.isLoading = false;
      }
    });
  }
  
  processAllCompetitions(competitionIds: string[]): void {
    // Initialize an array to store transformed results
    this.transformedData = [];
  
    // Iterate over all competition IDs
    competitionIds.forEach((id) => {
      this.fetchRegistrationBySearch(id);
    });
  }

  fetchEvent(eventId: string): Observable<eventRespons> {
    return this.EventService.getEventById(eventId);
  }
  
  fetchResultsByCompetitionId(ids: string[]): void {
    this.CompetitionService.getCompetitionsByIds(ids).subscribe({
      next: (response) => {
        console.log('Results: this is the ', response);
        // Handle the fetched results, e.g., store them in a component property or pass them to a UI handler.
      },
      error: (err) => {
        console.error('Error fetching competition results:', err);
        // Handle the error, e.g., show an error message to the user.
      },
    });
  }

  fetchRegistrationBySearch(competitionId: string): void {
    this.RegistrationService.getRegistrationBySearch(competitionId).subscribe({
      next: (registrations) => {
        console.log('Raw Registrations for Competition ID:', competitionId, registrations);
  
        // Transform the data for this competition
        const transformed = this.transformRegistrationData(registrations.values);
        console.log('Transformed Data for Competition ID:', competitionId, transformed);
  
        // Add the transformed data to the array
        this.transformedData = [...(this.transformedData || []), ...transformed];
      },
      error: (err) => {
        console.error('Error fetching registration data for Competition ID:', competitionId, err);
      },
    });
  }
  

  transformRegistrationData(registrations: RegistrationRespons[]): any[] {
    const transformedData = registrations.reduce((result: any[], registration) => {
      // Find or create the corresponding competition entry
      let competitionEntry = result.find(
        (entry) => entry.ExpandableTable === registration.competition.name
      );
  
      // Create participant using `createParticipant`
      const participant = createParticipant(registration.participant);
  
      // Build participant-specific data (order: name → entity)
      let participantDetails: any = {
        name: '', // Placeholder for the name
        entity: (participant as Ekvipage).entity?.name || 'N/A', // For Ekvipage, use entity name
      };
  
      // Set the name based on participant type
      if (participant.$type === 'Team') {
        const teamParticipant = participant as Team;
        participantDetails.name = teamParticipant.members
          ?.map((m) => `${m.firstName || ''} ${m.lastName || ''}`.trim())
          .join(', ') || participant.name || 'Unknown Team'; // Use team members' names or fallback to the team name
      } else if (participant.$type === 'Single') {
        const singleParticipant = participant as Single;
        participantDetails.name = singleParticipant.member
          ? `${singleParticipant.member.firstName || ''} ${singleParticipant.member.lastName || ''}`.trim()
          : 'Unknown Participant';
      } else if (participant.$type === 'Ekvipage') {
        const ekvipageParticipant = participant as Ekvipage;
        participantDetails.name = ekvipageParticipant.member
          ? `${ekvipageParticipant.member.firstName || ''} ${ekvipageParticipant.member.lastName || ''}`.trim()
          : 'Unknown Participant';
      }
  
      // If competition entry does not exist, create it
      if (!competitionEntry) {
        competitionEntry = {
          ExpandableTable: registration.competition.name, // Competition name
          data: [participantDetails], // Participant data with only name and entity
        };
        result.push(competitionEntry);
      } else {
        // Add participant details to existing competition entry
        competitionEntry.data.push(participantDetails);
      }
  
      return result;
    }, []);
  
    return transformedData;
  }
  
  
  
  
  

}
