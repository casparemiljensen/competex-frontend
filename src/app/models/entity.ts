import { Level, EntityType } from './enums';
export interface Entity {
  id?: string;
  type: EntityType;
  name: string;
  birthDate: string;
  level: Level;
  ownerID: string;
}