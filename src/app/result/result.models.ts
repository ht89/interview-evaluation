export enum Level {
  None,
  Junior,
  Professional,
}

export enum LevelColor {
  None = 'danger',
  Junior = 'warning',
  Professional = 'success',
}

export interface Result {
  section: string;
  level: Level;
  reasons: string;
}
