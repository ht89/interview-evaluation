export type Questions = Record<string, Question[]>;

export interface Question {
  id: string;
  answer: string;
}

export interface AnsweredQuestion {
  id: string;
  checked: boolean;
  section: string;
}

export enum QuestionResult {
  Incorrect,
  Correct,
}
