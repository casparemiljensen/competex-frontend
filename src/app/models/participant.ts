import { Entity } from './entity';
import { Member } from './member';

export interface Participant {
  id: string;
  name: string;
  $type: string;
}

export interface Team extends Participant {
  members?: Member[];
  memberIds?: string[];
}

export interface Single extends Participant {
  member?: Member;
  memberId?: string;
}

export interface Ekvipage extends Participant {
  member?: Member;
  memberId?: string;
  entity?: Entity;
  entityId?: string;
}

export type ParticipantType = Team | Single | Ekvipage;
