import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { Result } from './result.models';
import { AppService } from '../app.service';

@Component({
  selector: 'ie-result',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, TableModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResultComponent implements OnInit {
  results: Result[] = [];

  private readonly service = inject(AppService);

  ngOnInit(): void {
    this.setResults();
  }

  private setResults(): void {
    const questions = this.service.getQuestions();
    if (!questions) return;

    const sections = Object.keys(questions);
    /*
      Determine the level of each section:
      - If the score is <= 60%, the level is Junior
      - Otherwise, the level is Professional
      - Score = number of correct answers / total number of answers
      - Give reasons for Junior level of each section
    */
  }
}
