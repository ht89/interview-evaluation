import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PanelModule,
    QuestionComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
