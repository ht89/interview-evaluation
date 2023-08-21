import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { QuestionComponent } from '../question/question.component';
import { Questions } from '../question/question.models';
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

  private readonly service = inject(AppService);

  ngOnInit(): void {
    this.questions = this.service.getQuestions();

    if (this.questions) {
      this.sections = Object.keys(this.questions);
    }
  }
}
