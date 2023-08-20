import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { Question } from './question.models';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule, DividerModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnChanges {
  @Input() question!: Question;

  checked = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
