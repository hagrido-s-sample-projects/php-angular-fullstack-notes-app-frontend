import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../store/auth/auth.selectors';
import { map, take, tap, switchMap, filter } from 'rxjs';
import * as AuthActions from '../store/auth/auth.actions';

export const authGuard = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    tap(isAuthenticated => {
      if (isAuthenticated === null) {
        store.dispatch(AuthActions.initializeAuth());
      }
    }),
    switchMap(isAuthenticated => {
      if (isAuthenticated === null) {
        return store.select(selectIsAuthenticated).pipe(
          filter(auth => auth !== null),
          take(1)
        );
      }
      return [isAuthenticated];
    }),
    map(isAuthenticated => {
      console.log('Auth Guard - Is Authenticated:', isAuthenticated);
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
