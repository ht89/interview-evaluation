import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SectionsComponent } from './sections/sections.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SectionsComponent,
    ResultComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
