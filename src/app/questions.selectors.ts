import { createSelector } from '@ngrx/store';
import { QuestionsState } from './questions.reducer';

export interface AppState {
  questions: QuestionsState;
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

export const selectTotalQuestionsPerSection = createSelector(
  selectQuestionsFeature,
  (state: QuestionsState) => state.totalQuestionsPerSection
);

export const selectAnsweredQuestionsPerSection = createSelector(
  selectQuestionsFeature,
  (state: QuestionsState) => state.answeredQuestionsPerSection
);

export const selectResultPageModel = createSelector({
  sections: selectSections,
  totalQuestionsPerSection: selectTotalQuestionsPerSection,
  answeredQuestionsPerSection: selectAnsweredQuestionsPerSection,
});
