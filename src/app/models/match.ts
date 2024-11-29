import { MatchStatus, SurfaceType, JudgeType } from './enums';
import { Field } from './field';
import { Judge } from './judge';
import { Participant } from './participant';

export interface Match {
  id: string;
  roundId: string;
  participants: Participant[];
  status: MatchStatus;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  field: Field;
  judge: Judge;
  scores: any[]; // Replace `any` with a proper type when available
}
