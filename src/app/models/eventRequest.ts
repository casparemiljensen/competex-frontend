import { Status } from './enums';
import { CompetitionRequest } from './competitionRequest';

export interface eventRequest {
  id: string;
  title: string;
  organizer: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  locationId: string;
  registrationStartDate: string;
  registrationEndDate: string;
  status: Status;
  sportTypeId: string;
  competitions: CompetitionRequest[];
}
