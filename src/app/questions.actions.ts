import { createAction, props } from '@ngrx/store';
import { AnsweredQuestion } from './question/question.models';

export const setTotalQuestionsPerSection = createAction(
  '[Sections Component] Set Total Questions Per Section'
);

export const markAllQuestionsIncorrect = createAction(
  '[Sections Component] Mark All Questions Incorrect'
);

export const notifyCheckChange = createAction(
  '[Question Component] Notify Check Change',
  props<{ answeredQuestion: AnsweredQuestion }>()
);
