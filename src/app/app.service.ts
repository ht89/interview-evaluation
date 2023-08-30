import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import questionsJson from '../assets/questions.json';
import {
  AnsweredQuestion,
  AnsweredQuestions,
  QuestionResult,
  Questions,
  TotalQuestions,
} from './question/question.models';

@Injectable({ providedIn: 'root' })
export class AppService {
  data: Questions = {};

  totalQuestions: TotalQuestions = {};
  answeredQuestions: AnsweredQuestions = {};

  private correctQuestionSubject = new Subject<void>();

  getQuestions(): Questions {
    if (Object.keys(this.data).length > 0) return this.data;

    return questionsJson;
  }

  setAnswersPerSection(sections: string[], questions: Questions): void {
    if (sections?.length === 0 || Object.keys(questions).length === 0) return;

    const answersPerSection = sections.reduce((acc, section) => {
      acc[section] = questions[section].length;

      return acc;
    }, {} as TotalQuestions);

    this.totalQuestions = answersPerSection;
  }

  markAllQuestionsIncorrect(sections: string[], questions: Questions): void {
    sections.forEach((section) => {
      questions[section].forEach((question) => {
        const answeredQuestion: AnsweredQuestion = {
          checked: false,
          id: question.id,
          section,
        };

        this.markQuestion(answeredQuestion, QuestionResult.Incorrect);
      });
    });
  }

  markQuestion(question: AnsweredQuestion, result: QuestionResult): void {
    if (!this.answeredQuestions[question.section]) {
      this.answeredQuestions[question.section] = {
        [question.id]: result,
      };

      return;
    }

    this.answeredQuestions[question.section][question.id] = result;
  }

  correctQuestionChange(): Observable<void> {
    return this.correctQuestionSubject.asObservable();
  }

  publishCorrectQuestion(): void {
    this.correctQuestionSubject.next();
  }
}
