import { MatchStatus, SurfaceType, JudgeType } from './enums';
import { Field } from './field';
import { Judge } from './judge';
import { Participant } from './participant';
import { RoundResponse } from './roundResponse';
import { ScoreResponse } from './scoreResponse';

export interface MatchResponse {
  id: string;
  round: RoundResponse;
  roundId: string;
  participants: Participant[];
  participantIds: string[];
  status: MatchStatus;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  field: Field;
  fieldId: string;
  judge: Judge;
  judgeId: string;
  scores: ScoreResponse; // Replace `any` with a proper type when available
}
