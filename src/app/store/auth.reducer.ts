import { createReducer, on } from "@ngrx/store";
import { loginSuccess, logout } from "./auth.actions";
import { AuthState, initialAuthState } from "./auth.state";

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { token }) => ({
    ...state,
    token: token,
    authState: true,
  })),
  on(logout, (state) => ({
    ...state,
    token: null,
    authState: false,
  }))
);
