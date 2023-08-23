import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { QuestionComponent } from '../question/question.component';
import { CorrectQuestion, Questions } from '../question/question.models';
import { AppService } from '../app.service';

@Component({
  selector: 'ie-sections',
  standalone: true,
  imports: [CommonModule, PanelModule, QuestionComponent],
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
    }
  }

  onCheckChange(question: CorrectQuestion) {
    if (Object.keys(question).length === 0) return;

    if (!this.service.correctQuestions[question.section]) {
      this.service.correctQuestions[question.section] = [question.question];

      return;
    } else {
      this.service.correctQuestions[question.section].push(question.question);
    }

    this.service.publishCorrectQuestion();

    console.log(this.service.correctQuestions, this.service.totalQuestions);
  }
}
