import { Participant } from "./participant";
import { CompetitionResponse } from "./competitionResponse";
import { Status } from "./enums";

export interface RegistrationRespons {
    participant: Participant; 
    participantId: string;
    competition: CompetitionResponse;
    competitionId: string;
    registrationDate: Date;
    status: Status;
    id: string;
}