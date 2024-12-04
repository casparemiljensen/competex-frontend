import { SurfaceType } from './enums';
export interface Field {
  id: string;
  name: string | null; // Nullable
  location: string | null; // Nullable
  capacity: number;
  surface: SurfaceType;
}
