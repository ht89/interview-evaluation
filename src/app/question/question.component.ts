import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { CorrectQuestion, Question } from './question.models';

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

  @Output() checkChange = new EventEmitter<CorrectQuestion>();

  checked = false;
}
