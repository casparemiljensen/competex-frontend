import { Member } from './member';
import { JudgeType } from './enums';

export interface Judge {
  id: string;
  judgeType: JudgeType;
  member: Member;
  description: string | null; // Nullable
}
