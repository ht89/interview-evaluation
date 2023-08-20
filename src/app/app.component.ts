import { Component, OnInit, inject } from '@angular/core';
import { AppService } from './app.service';
import { Questions } from './question/question.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'interview-evaluation';
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
