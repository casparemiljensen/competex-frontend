import { Location } from './location'
import { Status } from './enums'
import { SportType } from './sportType';

export interface eventRespons {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    location: Location;
    registrationStartDate: string;
    registrationEndDate: string;
    status: Status;
    organizer: string[];
    sportType: SportType;
    competitions: any[];
}
