import { User } from '@angular/fire/auth';
import { AuthGuard } from '@angular/fire/auth-guard';
import { Route } from '@angular/router';
import { map } from 'rxjs';

const authPipe = map((user: User | null) => {
  return user ? true : ['login'];
});

export const routes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'questions',
    loadComponent: () =>
      import('./sections/sections.component').then((m) => m.SectionsComponent),
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => authPipe },
  },
  { path: '', redirectTo: 'questions', pathMatch: 'full' },
  { path: '**', redirectTo: 'questions' },
];
