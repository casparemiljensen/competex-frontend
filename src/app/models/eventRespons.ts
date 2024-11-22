import { Location } from './location'
import { Status } from './enums'

export interface eventRespons {
    id: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    location: Location;
    registrationStartDate: string;
    registrationEndDate: string;
    status: Status
}
