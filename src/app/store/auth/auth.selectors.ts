import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectSession = createSelector(
  selectAuthState,
  (state: AuthState) => state.session
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
