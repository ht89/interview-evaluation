import { createSelector } from '@ngrx/store';
import { AnsweredQuestions, TotalQuestions } from '../question/question.models';
import {
  selectAnsweredQuestions,
  selectSections,
  selectTotalQuestions,
} from './questions.reducer';

export interface ResultPageModel {
  sections: string[];
  totalQuestions: TotalQuestions;
  answeredQuestions: AnsweredQuestions;
}

export const selectResultPageModel = createSelector({
  sections: selectSections,
  totalQuestions: selectTotalQuestions,
  answeredQuestions: selectAnsweredQuestions,
});
