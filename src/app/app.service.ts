import { Injectable } from '@angular/core';

import data from '../assets/questions.json';
import { Question } from './shared/models/question.interface';

@Injectable({ providedIn: 'root' })
export class AppService {
  getQuestions(): Record<string, Question[]> {
    console.log(data);

    return data;
  }
}
