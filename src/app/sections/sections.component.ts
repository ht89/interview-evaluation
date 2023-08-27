import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { AppService } from '../app.service';
import { QuestionComponent } from '../question/question.component';
import {
  AnsweredQuestion,
  QuestionResult,
  Questions,
} from '../question/question.models';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'ie-sections',
  standalone: true,
  imports: [CommonModule, PanelModule, QuestionComponent, ResultComponent],
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  toggleable = true;

  questions: Questions = {};
  sections: string[] = [];

  readonly service = inject(AppService);

  ngOnInit(): void {
    this.questions = this.service.getQuestions();

    if (this.questions) {
      this.sections = Object.keys(this.questions);

      this.service.setAnswersPerSection(this.sections, this.questions);

      this.service.markAllQuestionsIncorrect(this.sections, this.questions);
    }
  }

  onCheckChange(question: AnsweredQuestion) {
    if (Object.keys(question).length === 0) return;

    const result = question.checked
      ? QuestionResult.Correct
      : QuestionResult.Incorrect;

    this.service.markQuestion(question, result);

    this.service.publishCorrectQuestion();
  }
}
