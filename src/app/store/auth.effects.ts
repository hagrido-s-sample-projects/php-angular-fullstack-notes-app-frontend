import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service'
import { login, loginSuccess, loginFailure, register, registerSuccess, registerFailure } from './auth.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((token) => loginSuccess({ token })),
          catchError(() => of(loginFailure()))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap((action) =>
        this.authService.register(action.username, action.email, action.password).pipe(
          map((response) => registerSuccess()),
          catchError(() => of(registerFailure()))
        )
      )
    )
  );
}

