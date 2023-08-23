export enum Level {
  None,
  Junior,
  Professional,
  Senior,
}

export interface Result {
  section: string;
  level: string;
  reasons: string;
}
