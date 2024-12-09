import { Location } from './location';
import { Status } from './enums';
import { SportType } from './sportType';
import { CompetitionResponse } from './competitionResponse';
import { Organizer } from './organizer';

export interface eventRespons {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location: Location;
  registrationStartDate: String;
  registrationEndDate: String;
  status: Status;
  organizer: Organizer;
  sportType: SportType;
  competitions: CompetitionResponse[];
  entryFee: number;
}
