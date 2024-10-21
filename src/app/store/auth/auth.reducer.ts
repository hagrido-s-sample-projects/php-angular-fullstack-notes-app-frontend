import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  error: { status: string; message: string } | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { accessToken }) => ({
    ...state,
    isAuthenticated: true,
    accessToken,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    accessToken: null,
    error,
  })),
  on(AuthActions.logout, () => initialAuthState),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    error: null
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
