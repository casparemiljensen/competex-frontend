import { Location } from './location';
import { Status } from './enums';
import { SportType } from './sportType';
import { CompetitionResponse } from './competitionResponse';
import { Organizer } from './organizer';

export interface eventResponse {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location: Location;
  registrationStartDate: Date;
  registrationEndDate: Date;
  status: Status;
  organizer: Organizer;
  sportType: SportType;
  competitions: CompetitionResponse[];
  entryFee: number;
}
