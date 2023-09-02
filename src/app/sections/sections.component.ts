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
import { Questions } from '../question/question.models';
import {
  markAllQuestionsIncorrect,
  setTotalQuestionsPerSection,
} from '../questions.actions';
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

    this.store.dispatch(setTotalQuestionsPerSection());
    this.store.dispatch(markAllQuestionsIncorrect());
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
}
