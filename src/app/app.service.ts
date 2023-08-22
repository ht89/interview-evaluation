import { Injectable } from '@angular/core';

import questionsJson from '../assets/questions.json';
import { Questions } from './question/question.models';

@Injectable({ providedIn: 'root' })
export class AppService {
  data: Questions = {};

  totalAnswers: Record<string, number> = {};
  correctAnswers: Record<string, Array<string>> = {};

  getQuestions(): Questions {
    if (Object.keys(this.data).length > 0) return this.data;

    return questionsJson;
  }

  setAnswersPerSection(sections: string[], questions: Questions): void {
    if (sections?.length === 0 || Object.keys(questions).length === 0) return;

    const answersPerSection = sections.reduce((acc, section) => {
      acc[section] = questions[section].length;

      return acc;
    }, {} as Record<string, number>);

    this.totalAnswers = answersPerSection;
  }
}
