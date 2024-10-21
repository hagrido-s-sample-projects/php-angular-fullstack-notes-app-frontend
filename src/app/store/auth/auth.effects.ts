import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { Session } from '../../models/session.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects { 
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(response => {
            if (response.status === 'SUCCESS' && response.access_token && response.refresh_token) {
              localStorage.setItem('access_token', response.access_token);
              localStorage.setItem('refresh_token', response.refresh_token);
              return AuthActions.loginSuccess({ accessToken: response.access_token, refreshToken: response.refresh_token });
            } else {
              return AuthActions.loginFailure({ error: { status: response.status, message: response.error || 'An unknown error occurred' } });
            }
          }),
          catchError(error => of(AuthActions.loginFailure({ error: { status: 'ERROR', message: error.message } })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        this.router.navigate(['/dashboard']);
      })
    ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ username, email, password }) =>
        this.authService.register(username, email, password).pipe(
          map(response => {
            if (response.status === 'SUCCESS') {
              return AuthActions.registerSuccess();
            } else {
              return AuthActions.registerFailure({ error: { status: 'ERROR', message: response.error || 'Registration failed' } });
            }
          }),
          catchError(error => of(AuthActions.registerFailure({ error: { status: 'ERROR', message: 'An error occurred during registration' } })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(() => {
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  initializeAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initializeAuth),
      map(() => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (accessToken && refreshToken) {
          return AuthActions.setTokens({ accessToken, refreshToken });
        }
        return AuthActions.logout();
      })
    )
  );
}
