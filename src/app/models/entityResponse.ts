import { Level, EntityType } from './enums';
export interface entityResponse {
  id: string;
  type: EntityType;
  name: string;
  birthDate: string;
  level: Level;
  ownerID: string; //change to owner object.
}
