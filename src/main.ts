import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { User, getAuth, provideAuth } from '@angular/fire/auth';
import {
  AuthGuard,
  AuthPipe,
  AuthPipeGenerator,
} from '@angular/fire/auth-guard';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, provideRouter } from '@angular/router';
import { map } from 'rxjs';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

const redirectUnauthorizedRequests: AuthPipe = map((user: User | null) => {
  // if not logged in, redirect to `auth`
  // if logged in and email verified, allow redirect
  // if logged in and email not verified, redirect to `auth/verify`
  // return !!user ? (user.emailVerified ? true : ['auth', 'verify']) : ['auth']

  return !!user ? true : ['login'];
});

const authPipeGenerator: AuthPipeGenerator = () => redirectUnauthorizedRequests;

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
    data: { authGuardPipe: authPipeGenerator },
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
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
