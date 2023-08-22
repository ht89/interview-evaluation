import { Injectable } from '@angular/core';

import questionsJson from '../assets/questions.json';
import { Questions } from './question/question.models';

@Injectable({ providedIn: 'root' })
export class AppService {
  data: Questions = {};

  answersPerSection: Record<string, number> = {};
  correctAnswersPerSection: Record<string, number> = {};

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

    this.answersPerSection = answersPerSection;
  }
}
