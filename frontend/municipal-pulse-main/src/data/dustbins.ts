export type DustbinType = "RED" | "GREEN" | "YELLOW";

export interface Dustbin {
  id: string;
  wardId: number;
  type: DustbinType;
  lat: number;
  lng: number;
  weight: number;
  collected: boolean;
}

export const dustbins: Dustbin[] = [
  { id: "W1-R", wardId: 1, type: "RED", lat: 23.03, lng: 72.58, weight: 80, collected: false },
  { id: "W1-G", wardId: 1, type: "GREEN", lat: 23.031, lng: 72.581, weight: 60, collected: false },
  { id: "W1-Y", wardId: 1, type: "YELLOW", lat: 23.032, lng: 72.582, weight: 40, collected: false }
];
