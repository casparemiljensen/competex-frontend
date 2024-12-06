import { Status } from './enums';
import { CompetitionRequest } from './competitionRequest';

export interface eventRequest {
  id?: string;
  title: string;
  organizer?: string;
  organizerId?: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  locationId: string;
  registrationStartDate: string;
  registrationEndDate: string;
  status: Status;
  sportTypeId: string;
  competitionIds: string[];
  entryFee: number;
}
