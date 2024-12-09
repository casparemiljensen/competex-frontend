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
