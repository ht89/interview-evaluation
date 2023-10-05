import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AnsweredQuestion } from '../question/question.models';

export const SectionsComponentActions = createActionGroup({
  source: 'Sections Component',
  events: {
    setTotalQuestions: emptyProps(),
    markAllQuestionsIncorrect: emptyProps(),
  },
});

export const QuestionComponentActions = createActionGroup({
  source: 'Question Component',
  events: {
    notifyCheckChange: props<{ answeredQuestion: AnsweredQuestion }>(),
  },
});
