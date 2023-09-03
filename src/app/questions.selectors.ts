import { createSelector } from '@ngrx/store';
import { AnsweredQuestions, TotalQuestions } from './question/question.models';
import { QuestionsState } from './questions.reducer';

export interface AppState {
  questions: QuestionsState;
}

export interface ResultPageModel {
  sections: string[];
  totalQuestions: TotalQuestions;
  answeredQuestions: AnsweredQuestions;
}

export const selectQuestionsFeature = (state: AppState) => state.questions;

export const selectQuestions = createSelector(
  selectQuestionsFeature,
  (state: QuestionsState) => state.questions
);

export const selectSections = createSelector(
  selectQuestionsFeature,
  (state: QuestionsState) => state.sections
);

export const selectTotalQuestions = createSelector(
  selectQuestionsFeature,
  (state: QuestionsState) => state.totalQuestions
);

export const selectAnsweredQuestions = createSelector(
  selectQuestionsFeature,
  (state: QuestionsState) => state.answeredQuestions
);

export const selectResultPageModel = createSelector({
  sections: selectSections,
  totalQuestions: selectTotalQuestions,
  answeredQuestions: selectAnsweredQuestions,
});
