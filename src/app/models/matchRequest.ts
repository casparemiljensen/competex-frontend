import { MatchStatus, SurfaceType, JudgeType } from './enums';
import { Field } from './field';
import { Judge } from './judge';
import { Participant } from './participant';
import { ScoreRequest } from './scoreRequest';

export interface MatchRequest {
  id: string;
  roundId: string;
  participantIds: string[];
  status: MatchStatus;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  fieldId: string;
  judgeId: string;
  // scores: ScoreRequest[]; //ScoreRequest[];
}
