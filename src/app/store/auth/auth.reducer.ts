import { Action } from "@ngrx/store";
import { Session } from "../../models/session.model";
import { act } from "@ngrx/effects";

export interface AuthState {
  isAuthenticated: boolean | null;
  session: Session | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: null,
  session: null,
};

export function authReducer(state = initialAuthState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}