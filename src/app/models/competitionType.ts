import { ScoreType, ScoreMethod } from './enums';
export interface CompetitionType {
  name: string | null; // Nullable
  competitionAttributes: string[]; // Replace with a specific type if known
  scoreType: ScoreType; // Enum for ScoreType
  scoreMethod: ScoreMethod; // Enum for ScoreMethod
  id: string;
}
