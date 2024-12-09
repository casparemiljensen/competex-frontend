import { CompetitionType } from './competitionType';
import { Level, Status } from './enums';
export interface CompetitionResponse {
  id: string; // UUID
  competitionType: CompetitionType[]; // Replace [...] with the expected type, e.g., string[] or an enum
  event: string; // UUID
  name: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  level: Level; // Enum for Level
  status: Status; // Enum for Status
  minParticipants: number;
  maxParticipants: number;
  registrationPrice: number;
}
