import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import questionsJson from '../assets/questions.json';
import {
  AnsweredQuestion,
  AnsweredQuestions,
  QuestionResult,
  Questions,
  TotalQuestions,
} from './question/question.models';
import * as QuestionsActions from './questions.actions';

export interface QuestionsState {
  questions: Questions;
  sections: string[];
  totalQuestions: TotalQuestions;
  answeredQuestions: AnsweredQuestions;
}

export const initialState: QuestionsState = {
  questions: questionsJson,
  sections: Object.keys(questionsJson),
  totalQuestions: {},
  answeredQuestions: {},
};

export const questionsFeatureKey = 'questions';

export const questionsReducer = createReducer(
  initialState,
  on(QuestionsActions.setTotalQuestions, (state) => {
    const totalQuestions = state.sections.reduce((acc, section) => {
      acc[section] = state.questions[section].length;

      return acc;
    }, {} as TotalQuestions);

    return {
      ...state,
      totalQuestions,
    };
  }),
  on(QuestionsActions.markAllQuestionsIncorrect, (state) => {
    const answeredQuestions = cloneDeep(state.answeredQuestions);

    state.sections.forEach((section) => {
      state.questions[section].forEach((question) => {
        const answeredQuestion: AnsweredQuestion = {
          checked: false,
          id: question.id,
          section,
        };

        markQuestion(
          answeredQuestion,
          QuestionResult.Incorrect,
          answeredQuestions
        );
      });
    });

    return {
      ...state,
      answeredQuestions,
    };
  }),
  on(QuestionsActions.notifyCheckChange, (state, { answeredQuestion }) => {
    const answeredQuestions = cloneDeep(state.answeredQuestions);

    const result = answeredQuestion.checked
      ? QuestionResult.Correct
      : QuestionResult.Incorrect;

    markQuestion(answeredQuestion, result, answeredQuestions);

    return { ...state, answeredQuestions: answeredQuestions };
  })
);

const markQuestion = (
  question: AnsweredQuestion,
  result: QuestionResult,
  answeredQuestions: AnsweredQuestions
): void => {
  if (!answeredQuestions[question.section]) {
    answeredQuestions[question.section] = {
      [question.id]: result,
    };

    return;
  }

  answeredQuestions[question.section][question.id] = result;
};
