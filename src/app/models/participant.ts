import { Entity } from './entity';
import { Member } from './member';

export interface Participant {
  id: string;
  name: string;
  $type?: string; //not removed, due to maybe need in code somewhere for old code...
  member?: Member; //Added since we only have this type of participant now..
  entity?: Entity; //Added since we only have this type of participant now..
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

//not used in current version, only one type of participant now
export function createParticipant(data: any): ParticipantType {
  switch (data.$type) {
    case 'Team':
      return {
        ...data, // Spread the data to ensure all fields are included
        members: data.members || [],
        memberIds: data.memberIds || [],
      } as Team;
    case 'Single':
      return {
        ...data,
        member: data.member || undefined,
        memberId: data.memberId || '',
      } as Single;
    case 'Ekvipage':
      return {
        ...data,
        member: data.member || undefined,
        memberId: data.memberId || '',
        entity: data.entity || undefined,
        entityId: data.entityId || '',
      } as Ekvipage;
    default:
      throw new Error(`Invalid participant type: ${data.$type}`);
  }
}
