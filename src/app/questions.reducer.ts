import { createReducer, on } from '@ngrx/store';
import questionsJson from '../assets/questions.json';
import { Questions, TotalQuestions } from './question/question.models';
import { setTotalQuestionsPerSection } from './questions.actions';

export const initialState = {
  questions: questionsJson,
  sections: Object.keys(questionsJson),
  totalQuestionsPerSection: {},
  answeredQuestionsPerSection: {},
};

export const questionsReducer = createReducer(
  initialState,
  on(setTotalQuestionsPerSection, (state) => {
    const sections = Object.keys(state.questions);

    const totalQuestionsPerSection = sections.reduce((acc, section) => {
      acc[section] = (state.questions as Questions)[section].length;

      return acc;
    }, {} as TotalQuestions);

    return {
      ...state,
      totalQuestionsPerSection,
    };
  })
);
