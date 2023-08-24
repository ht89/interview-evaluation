export type Questions = Record<string, Question[]>;

export interface Question {
  question: string;
  answer: string;
}

export interface CorrectQuestion {
  checked: boolean;
  section: string;
  question: string;
}
