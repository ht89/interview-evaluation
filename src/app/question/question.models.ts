export type Questions = Record<string, Question[]>;

export interface Question {
  question: string;
  answer: string;
}
