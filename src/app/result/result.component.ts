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
import {
  AnsweredQuestions,
  QuestionResult,
  TotalQuestions,
} from '../question/question.models';
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
  overallLevelColor = LevelColor.None;

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
    const sections = Object.keys(questions);

    if (sections?.length === 0) return;

    const { totalQuestions, answeredQuestions } = this.service;
    let numOfJuniorLevels = 0;
    let numOfProLevels = 0;

    sections.forEach((section) => {
      const score = this.setScore(totalQuestions, answeredQuestions, section);
      const level = this.setLevel(score);
      const reasons = this.setReasons(answeredQuestions, section);

      this.setResult(section, level, reasons);

      if (level !== Level.None) {
        level === Level.Junior ? numOfJuniorLevels++ : numOfProLevels++;
      }
    });

    this.setOverallResult(numOfJuniorLevels, numOfProLevels);
  }

  private setScore(
    totalQuestions: TotalQuestions,
    answeredQuestions: AnsweredQuestions,
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
    answeredQuestions: AnsweredQuestions,
    section: string
  ): string {
    return Object.keys(answeredQuestions[section]).reduce((acc, question) => {
      const result = answeredQuestions[section][question];

      if (result === QuestionResult.Correct) return acc;

      if (acc.length === 0) {
        acc = `No knowledge of ${question}`;
      } else {
        acc += `, ${question}`;
      }

      return acc;
    }, '');
  }

  private setResult(section: string, level: Level, reasons: string): void {
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
  }

  private setOverallResult(
    numOfJuniorLevels: number,
    numOfProLevels: number
  ): void {
    if (numOfJuniorLevels === 0 && numOfProLevels === 0) {
      return;
    }

    this.overallResult =
      numOfJuniorLevels >= numOfProLevels ? Level.Junior : Level.Professional;

    this.setLevelColor();
  }

  private setLevelColor(): void {
    this.overallLevelColor =
      this.overallResult === Level.Junior
        ? LevelColor.Junior
        : LevelColor.Professional;
  }

  private setLevel(score: number): Level {
    if (score === 0) return Level.None;

    return score < 0.6 ? Level.Junior : Level.Professional;
  }
}
