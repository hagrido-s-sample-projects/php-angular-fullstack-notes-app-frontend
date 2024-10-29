import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../store/auth/auth.selectors';
import { map, take } from 'rxjs';

export const authGuard = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
