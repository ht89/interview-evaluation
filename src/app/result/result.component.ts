import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from '../app.service';
import { QuestionResult } from '../question/question.models';
import { Level, LevelColor, Result } from './result.models';

@Component({
  selector: 'ie-result',
  standalone: true,
  imports: [
    CommonModule,
    ClipboardModule,
    CardModule,
    TagModule,
    TableModule,
    ButtonModule,
  ],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResultComponent implements OnInit, OnDestroy {
  results: Result[] = [];
  overallResult = Level.None;

  Level = Level;
  levelColor = LevelColor.None;

  private readonly service = inject(AppService);

  private notifier$ = new Subject();

  ngOnInit(): void {
    this.setResults();

    this.service
      .correctQuestionChange()
      .pipe(takeUntil(this.notifier$))
      .subscribe(() => this.setResults());
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  private setResults(): void {
    const questions = this.service.getQuestions();
    if (!questions) return;

    const sections = Object.keys(questions);
    const { totalQuestions, answeredQuestions } = this.service;

    sections.forEach((section) => {
      const score = this.setScore(totalQuestions, answeredQuestions, section);

      const level = this.setLevel(score);

      const reasons = this.setReasons(answeredQuestions, section);

      const idx = this.results.findIndex((item) => item.section === section);
      if (idx !== -1) {
        this.results[idx].level = level;
        this.results[idx].reasons = reasons;
      } else {
        this.results.push({
          section,
          level,
          reasons,
        });
      }
    });

    this.setOverallResult();
  }

  private setScore(
    totalQuestions: Record<string, number>,
    answeredQuestions: Record<string, Record<string, QuestionResult>>,
    section: string
  ): number {
    const correctQuestions = Object.keys(answeredQuestions[section]).reduce(
      (acc, question) => {
        if (answeredQuestions[section][question] === QuestionResult.Correct) {
          acc++;
        }

        return acc;
      },
      0
    );

    return correctQuestions / totalQuestions[section];
  }

  private setReasons(
    answeredQuestions: Record<string, Record<string, QuestionResult>>,
    section: string
  ): string {
    return Object.keys(answeredQuestions[section]).reduce((acc, question) => {
      const result = answeredQuestions[section][question];

      if (result === QuestionResult.Incorrect) {
        if (acc.length === 0) {
          acc = `No knowledge of ${question}`;
        } else {
          acc += `, ${question}`;
        }
      }

      return acc;
    }, '');
  }

  private setOverallResult(): void {
    let numOfJuniorLevels = 0;
    let numOfProfessionalLevels = 0;

    this.results.forEach((result) => {
      if (result.level === Level.Junior) {
        numOfJuniorLevels++;
      } else if (result.level === Level.Professional) {
        numOfProfessionalLevels++;
      }
    });

    if (numOfJuniorLevels === 0 && numOfProfessionalLevels === 0) {
      return;
    }

    this.overallResult =
      numOfJuniorLevels >= numOfProfessionalLevels
        ? Level.Junior
        : Level.Professional;

    this.setLevelColor();
  }

  private setLevelColor(): void {
    this.levelColor =
      this.overallResult === Level.Junior
        ? LevelColor.Junior
        : LevelColor.Professional;
  }

  private setLevel(score: number): Level {
    if (score === 0) return Level.None;

    return score < 0.6 ? Level.Junior : Level.Professional;
  }
}
