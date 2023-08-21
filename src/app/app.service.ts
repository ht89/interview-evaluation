import { Injectable } from '@angular/core';

import questionsJson from '../assets/questions.json';
import { Questions } from './question/question.models';

@Injectable({ providedIn: 'root' })
export class AppService {
  data: Questions = {};

  getQuestions(): Questions {
    if (Object.keys(this.data).length > 0) return this.data;

    return questionsJson;
  }
}
