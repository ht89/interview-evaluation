import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AnsweredQuestion } from '../question/question.models';

export const SectionsComponentActions = createActionGroup({
  source: 'Sections Component',
  events: {
    'Set Total Questions': emptyProps(),
    'Mark All Questions Incorrect': emptyProps(),
  },
});

export const QuestionComponentActions = createActionGroup({
  source: 'Question Component',
  events: {
    'Notify Check Change': props<{ answeredQuestion: AnsweredQuestion }>(),
  },
});
