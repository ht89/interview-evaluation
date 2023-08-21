export enum Level {
  Junior,
  Professional,
  Senior,
}

export interface Result {
  section: string;
  level: Level;
  reasons: string;
}
