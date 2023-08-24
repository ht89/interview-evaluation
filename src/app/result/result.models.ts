export enum Level {
  None,
  Junior,
  Professional,
}

export interface Result {
  section: string;
  level: Level;
  reasons: string;
}
