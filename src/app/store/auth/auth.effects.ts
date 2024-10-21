import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { Session } from '../../models/session.model';
import { User } from '../../models/user.model';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(response => {
            return AuthActions.loginSuccess({
              accessToken: response.access_token || '',
              refreshToken: response.refresh_token || ''
            });
          }),
          catchError(error => of(AuthActions.loginFailure({
            error: {
              status: error.status || 'unknown',
              message: error.message || 'An unknown error occurred'
            }
          })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ email, username, password }) =>
        this.authService.register(email, username, password).pipe(
          map(() => AuthActions.registerSuccess()),
          catchError(error => of(AuthActions.registerFailure({
            error: {
              status: error.status || 'unknown',
              message: error.message || 'An unknown error occurred'
            }
          })))
        )
      )
    )
  );
}
