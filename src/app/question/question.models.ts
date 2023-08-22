export type Questions = Record<string, Question[]>;

export interface Question {
  question: string;
  answer: string;
}

export interface CorrectQuestion {
  section: string;
  question: string;
}
