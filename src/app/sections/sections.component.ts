import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { QuestionComponent } from '../question/question.component';
import {
  AnsweredQuestion,
  QuestionResult,
  Questions,
  TotalQuestions,
} from '../question/question.models';
import { selectQuestions, selectSections } from '../questions.selectors';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'ie-sections',
  standalone: true,
  imports: [
    CommonModule,
    PanelModule,
    ButtonModule,
    QuestionComponent,
    ResultComponent,
  ],
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  toggleable = true;

  questions$!: Observable<Questions>;
  sections$!: Observable<string[]>;

  readonly service = inject(AppService);

  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.questions$ = this.store.select(selectQuestions);

    this.sections$ = this.store.select(selectSections);

    // this.setTotalQuestionsPerSection(this.sections, this.questions);

    // this.markAllQuestionsIncorrect(this.sections, this.questions);
  }

  onCheckChange(question: AnsweredQuestion) {
    if (Object.keys(question).length === 0) return;

    const result = question.checked
      ? QuestionResult.Correct
      : QuestionResult.Incorrect;

    this.markQuestion(question, result);

    this.service.notifyCheckChange();
  }

  logout(): void {
    this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private setTotalQuestionsPerSection(
    sections: string[],
    questions: Questions
  ): void {
    if (sections?.length === 0 || Object.keys(questions).length === 0) return;

    const totalQuestionsPerSection = sections.reduce((acc, section) => {
      acc[section] = questions[section].length;

      return acc;
    }, {} as TotalQuestions);

    this.service.totalQuestionsPerSection = totalQuestionsPerSection;
  }

  private markAllQuestionsIncorrect(
    sections: string[],
    questions: Questions
  ): void {
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
    if (!this.service.answeredQuestions[question.section]) {
      this.service.answeredQuestions[question.section] = {
        [question.id]: result,
      };

      return;
    }

    this.service.answeredQuestions[question.section][question.id] = result;
  }
}
