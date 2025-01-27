import { createFeature, createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import questionsJson from '../../assets/questions.json';
import {
  AnsweredQuestion,
  AnsweredQuestions,
  QuestionResult,
  Questions,
  TotalQuestions,
} from '../question/question.models';
import {
  QuestionComponentActions,
  SectionsComponentActions,
} from './questions.actions';

interface State {
  questions: Questions;
  sections: string[];
  totalQuestions: TotalQuestions;
  answeredQuestions: AnsweredQuestions;
}

const initialState: State = {
  questions: questionsJson,
  sections: Object.keys(questionsJson),
  totalQuestions: {},
  answeredQuestions: {},
};

export const questionsFeature = createFeature({
  name: 'questions',
  reducer: createReducer(
    initialState,
    on(SectionsComponentActions.setTotalQuestions, (state) => {
      const totalQuestions = state.sections.reduce((acc, section) => {
        acc[section] = state.questions[section].length;

        return acc;
      }, {} as TotalQuestions);

      return {
        ...state,
        totalQuestions,
      };
    }),
    on(SectionsComponentActions.markAllQuestionsIncorrect, (state) => {
      const answeredQuestions = cloneDeep(state.answeredQuestions);

      state.sections.forEach((section) => {
        state.questions[section].forEach((question) => {
          const answeredQuestion: AnsweredQuestion = {
            checked: false,
            id: question.id,
            section,
          };

          markQuestion(answeredQuestion, answeredQuestions);
        });
      });

      return {
        ...state,
        answeredQuestions,
      };
    }),
    on(
      QuestionComponentActions.notifyCheckChange,
      (state, { answeredQuestion }) => {
        const answeredQuestions = cloneDeep(state.answeredQuestions);

        markQuestion(answeredQuestion, answeredQuestions);

        return { ...state, answeredQuestions };
      }
    )
  ),
});

export const {
  name, // feature name
  reducer,
  selectQuestionsState, // feature selector
  // selector for each prop
  selectQuestions,
  selectSections,
  selectTotalQuestions,
  selectAnsweredQuestions,
} = questionsFeature;

/* ***********Private ************ */
const markQuestion = (
  answeredQuestion: AnsweredQuestion,
  answeredQuestions: AnsweredQuestions
): void => {
  const result = answeredQuestion.checked
    ? QuestionResult.Correct
    : QuestionResult.Incorrect;

  if (!answeredQuestions[answeredQuestion.section]) {
    answeredQuestions[answeredQuestion.section] = {
      [answeredQuestion.id]: result,
    };

    return;
  }

  answeredQuestions[answeredQuestion.section][answeredQuestion.id] = result;
};
