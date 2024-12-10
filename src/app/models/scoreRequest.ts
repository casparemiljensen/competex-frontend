// import { Penalty } from './penalty';

export interface ScoreRequest {
  $type: 'TimeScore' | 'SetScore' | 'PointScore' | 'TimeFaultScore'; // Discriminator field for score type
  matchId: string;
  participantId: string;
  // penalties?: Penalty[]; // Array of penalties, not in scope yet
  // penaltyIds?: string[]; // IDs of penalties, not in scope yet
}

export interface TimeScore extends ScoreRequest {
  $type: 'TimeScore'; // Discriminator value
  time: string; // ISO duration string or timespan
}

export interface SetScore extends ScoreRequest {
  $type: 'SetScore'; // Discriminator value
  // Additional fields specific to SetScore
}

export interface PointScore extends ScoreRequest {
  $type: 'PointScore'; // Discriminator value
  // Additional fields specific to PointScore
}
export interface TimeFaultScore extends ScoreRequest {
  $type: 'TimeFaultScore'; // Discriminator value
  time: string; // ISO duration string or timespan
  faults: number; // Number of faults
}

// Union type for the score
export type ScoreType = TimeScore | SetScore | PointScore | TimeFaultScore;
