import { createAction, props } from '@ngrx/store';
import { Questions } from './question/question.models';

export const setTotalQuestionsPerSection = createAction(
  '[Sections Component] Set Total Questions Per Section',
  props<{ sections: string[]; questions: Questions }>()
);

export const markAllQuestionsIncorrect = createAction(
  '[Sections Component] Mark All Questions Incorrect',
  props<{ sections: string[]; questions: Questions }>()
);
