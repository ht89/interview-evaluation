import { createReducer, on } from '@ngrx/store';
import questionsJson from '../assets/questions.json';
import {
  AnsweredQuestions,
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
  })
);
