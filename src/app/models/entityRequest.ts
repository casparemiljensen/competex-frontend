import { Level, EntityType } from './enums';
export interface entityRequest {
  type: EntityType;
  name: string;
  birthDate: string;
  level: Level;
  ownerID: string;
}
