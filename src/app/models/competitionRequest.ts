import { competitionType } from './competitionType';
import { Level, Status } from './enums';

export interface CompetitionRequest {
  id: string; // UUID
  competitionTypeId?: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  level: Level; // Enum for Level
  status: Status; // Enum for Status
  minParticipants: number;
  maxParticipants: number;
  registrationPrice: number;
}
