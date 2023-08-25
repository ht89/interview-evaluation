export type Questions = Record<string, Question[]>;

export interface Question {
  question: string;
  answer: string;
}

export interface AnsweredQuestion {
  checked: boolean;
  section: string;
  question: string;
}

export enum QuestionResult {
  Incorrect,
  Correct,
}
