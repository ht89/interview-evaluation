import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { QuestionComponent } from '../question/question.component';
import { Questions } from '../shared/models/section.interface';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, PanelModule, QuestionComponent],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnChanges {
  @Input() section!: string;

  @Input() questions!: Questions;

  @Input() toggleable = true;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
