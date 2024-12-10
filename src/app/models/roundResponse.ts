import { CompetitionResponse } from './competitionResponse';
import { RoundStatus, RoundType } from './enums';

export interface RoundResponse {
  id: string;
  name: string;
  sequenceNumber: number;
  roundType: RoundType;
  competition: CompetitionResponse;
  competitionId: string;
  status: RoundStatus;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
}
