import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { User, getAuth, provideAuth } from '@angular/fire/auth';
import { AuthGuard } from '@angular/fire/auth-guard';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, provideRouter } from '@angular/router';
import { map } from 'rxjs';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

const authPipe = map((user: User | null) => {
  return user ? true : ['login'];
});

const routes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./app/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'questions',
    loadComponent: () =>
      import('./app/sections/sections.component').then(
        (m) => m.SectionsComponent
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => authPipe },
  },
  { path: '', redirectTo: 'questions', pathMatch: 'full' },
  { path: '**', redirectTo: 'questions' },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase))
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    provideRouter(routes),
  ],
});
