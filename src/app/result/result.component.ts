import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { Level, Result } from './result.models';
import { AppService } from '../app.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ie-result',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, TableModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResultComponent implements OnInit, OnDestroy {
  results: Result[] = [];
  overallResult = Level.None;

  Level = Level;

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

    const { totalQuestions, correctQuestions } = this.service;
    sections.forEach((section) => {
      const score =
        (correctQuestions[section]?.length ?? 0) / totalQuestions[section];

      const level = this.setLevel(score);

      const idx = this.results.findIndex((item) => item.section === section);
      if (idx !== -1) {
        this.results[idx].level = level;
        this.results[idx].reasons = '';
      } else {
        this.results.push({
          section,
          level,
          reasons: '',
        });
      }
    });

    this.setOverallResult();
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
  }

  private setLevel(score: number): Level {
    if (score === 0) return Level.None;

    return score < 0.6 ? Level.Junior : Level.Professional;
  }
}
