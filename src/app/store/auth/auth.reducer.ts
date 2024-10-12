import { createReducer, on } from "@ngrx/store";
import * as AuthActions from './auth.actions';

export interface AuthState {
  status: 'not-initialized' | 'loading' | 'logged-in' | 'logged-out';
  token: string | null;
}

export const initialState: AuthState = {
  status: 'not-initialized',
  token: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    status: 'logged-in' as const,
    token,
  })),
  on(AuthActions.logout, () => initialState),
);