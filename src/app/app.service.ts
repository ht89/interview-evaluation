import { Injectable } from '@angular/core';

import questionsJson from '../assets/questions.json';
import { CorrectQuestion, Questions } from './question/question.models';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  data: Questions = {};

  totalQuestions: Record<string, number> = {};
  correctQuestions: Record<string, Array<string>> = {};

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
    }, {} as Record<string, number>);

    this.totalQuestions = answersPerSection;
  }

  correctQuestionChange(): Observable<void> {
    return this.correctQuestionSubject.asObservable();
  }

  publishCorrectQuestion(): void {
    this.correctQuestionSubject.next();
  }
}
