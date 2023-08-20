import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, PanelModule, QuestionComponent],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  @Input() header!: string;

  @Input() toggleable = true;
}
