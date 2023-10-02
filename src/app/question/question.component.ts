import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { notifyCheckChange } from '../state/questions.actions';
import { AnsweredQuestion, Question } from './question.models';

@Component({
  selector: 'ie-question',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule, DividerModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {
  @Input() question!: Question;

  @Input() section!: string;

  checked = false;

  private readonly store = inject(Store);

  onCheckChange(): void {
    const answeredQuestion: AnsweredQuestion = {
      checked: this.checked,
      section: this.section,
      id: this.question.id,
    };

    this.store.dispatch(notifyCheckChange({ answeredQuestion }));
  }
}
