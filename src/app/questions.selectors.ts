import { QuestionsState } from './questions.reducer';

export const selectSections = (state: QuestionsState) => state.sections;

export const selectQuestions = (state: QuestionsState) => state.questions;
