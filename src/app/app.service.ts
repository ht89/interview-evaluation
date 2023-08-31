import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import questionsJson from '../assets/questions.json';
import {
  AnsweredQuestions,
  Questions,
  TotalQuestions,
} from './question/question.models';

@Injectable({ providedIn: 'root' })
export class AppService {
  totalQuestionsPerSection: TotalQuestions = {};
  answeredQuestions: AnsweredQuestions = {};

  private data: Questions = {};

  private checkChangeSubject = new Subject<void>();

  getQuestions(): Questions {
    if (Object.keys(this.data).length === 0) this.data = questionsJson;

    return this.data;
  }

  checkChange(): Observable<void> {
    return this.checkChangeSubject.asObservable();
  }

  notifyCheckChange(): void {
    this.checkChangeSubject.next();
  }
}
