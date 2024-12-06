import { CompetitionType } from './competitionType';
import { Level, Status } from './enums';

export interface CompetitionRequest {
  id?: string; // UUID
  competitionType?: CompetitionType[];
  competitionTypeId?: string; // UUID
  eventId: string; // UUID
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  level: Level; // Enum for Level
  status: Status; // Enum for Status
  minParticipants: number;
  maxParticipants: number;
  registrationPrice: number;
}
