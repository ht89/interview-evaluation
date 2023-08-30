export type Questions = Record<string, Question[]>;

export type AnsweredQuestions = Record<string, Record<string, QuestionResult>>;

export type TotalQuestions = Record<string, number>;

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
