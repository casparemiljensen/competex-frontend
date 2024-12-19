import { Location } from './location';
import { Status } from './enums';
import { SportType } from './sportType';
import { CompetitionResponse } from './competitionResponse';
import { Club } from './club';

export interface eventResponse {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location: Location;
  registrationStartDate: string;
  registrationEndDate: string;
  status: Status;
  organizer: Club;
  sportType: SportType;
  competitions: CompetitionResponse[];
  entryFee: number;
}
