import { Injectable } from '@angular/core';

import data from '../assets/questions.json';
import { Question } from './question/question.models';

@Injectable({ providedIn: 'root' })
export class AppService {
  getQuestions(): Record<string, Question[]> {
    console.log(data);

    return data;
  }
}
