import { ParticipantType } from "./participant";
import { CompetitionResponse } from "./competitionResponse";
import { createParticipant } from "./participant";

export interface ScoreResultsResponse {
    id: string;
    compition: CompetitionResponse;
    compitionId: string;
    participant: ParticipantType; 
    participantId: string;
    faults: number;
    time: string;
}