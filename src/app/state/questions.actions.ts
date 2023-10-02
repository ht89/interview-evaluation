import { createAction, props } from '@ngrx/store';
import { AnsweredQuestion } from '../question/question.models';

export const setTotalQuestions = createAction(
  '[Sections Component] Set Total Questions'
);

export const markAllQuestionsIncorrect = createAction(
  '[Sections Component] Mark All Questions Incorrect'
);

export const notifyCheckChange = createAction(
  '[Question Component] Notify Check Change',
  props<{ answeredQuestion: AnsweredQuestion }>()
);
