import { RoundStatus, RoundType } from './enums';

export interface RoundRequest {
  id?: string;
  name?: string;
  sequenceNumber: number;
  roundType?: RoundType;
  competitionId: string;
  status?: RoundStatus;
  startTime?: string; // ISO date string
  endTime?: string; // ISO date string
}
