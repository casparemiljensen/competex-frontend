export interface SportType {
    id: string; // UUID
    name: string;
    eventAttributes?: any[]; // Define the correct type if eventAttributes has a specific structure
    entityType: EntityType; // Enum
  }
  
  export enum EntityType {
    TYPE1 = 1,
    TYPE2 = 2,
    TYPE3 = 3,
  }
  