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
  totalQuestionsPerSection: TotalQuestions;
  answeredQuestionsPerSection: AnsweredQuestions;
}

export const initialState: QuestionsState = {
  questions: questionsJson,
  sections: Object.keys(questionsJson),
  totalQuestionsPerSection: {},
  answeredQuestionsPerSection: {},
};

export const questionsFeatureKey = 'questions';

export const questionsReducer = createReducer(
  initialState,
  on(QuestionsActions.setTotalQuestionsPerSection, (state) => {
    const totalQuestionsPerSection = state.sections.reduce((acc, section) => {
      acc[section] = state.questions[section].length;

      return acc;
    }, {} as TotalQuestions);

    return {
      ...state,
      totalQuestionsPerSection,
    };
  }),
  on(QuestionsActions.markAllQuestionsIncorrect, (state) => {
    const answeredQuestionsPerSection = cloneDeep(
      state.answeredQuestionsPerSection
    );

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
          answeredQuestionsPerSection
        );
      });
    });

    return {
      ...state,
      answeredQuestionsPerSection,
    };
  }),
  on(QuestionsActions.notifyCheckChange, (state, { answeredQuestion }) => {
    const answeredQuestionsPerSection = cloneDeep(
      state.answeredQuestionsPerSection
    );

    const result = answeredQuestion.checked
      ? QuestionResult.Correct
      : QuestionResult.Incorrect;

    markQuestion(answeredQuestion, result, answeredQuestionsPerSection);

    return { ...state, answeredQuestionsPerSection };
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
