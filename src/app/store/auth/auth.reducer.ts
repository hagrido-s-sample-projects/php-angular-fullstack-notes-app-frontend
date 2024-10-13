import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { Session } from '../../models/session.model';

export interface AuthState {
  isAuthenticated: boolean;
  session: Session | null;
  error: any;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  session: null,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { session }) => ({
    ...state,
    isAuthenticated: true,
    session,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    session: null,
    error,
  })),
  on(AuthActions.logout, () => initialAuthState)
);
