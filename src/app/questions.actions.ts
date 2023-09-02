import { createAction } from '@ngrx/store';

export const setTotalQuestionsPerSection = createAction(
  '[Sections Component] Set Total Questions Per Section'
);

export const markAllQuestionsIncorrect = createAction(
  '[Sections Component] Mark All Questions Incorrect'
);
