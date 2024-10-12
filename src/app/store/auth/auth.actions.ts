import { createAction, props } from "@ngrx/store";

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: { status: string, message: string | null } }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ username: string; email: string; password: string }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: { status: string, message: string | null } }>()
);

export const logout = createAction(
  '[Auth] Logout'
);