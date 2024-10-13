import { createAction, props } from "@ngrx/store";
import { Session } from "../../models/session.model";

export const login = createAction('[Auth] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ session: Session }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: { code: string; message: string } }>());

export const register = createAction('[Auth] Register', props<{ email: string; username: string; password: string }>());
export const registerSuccess = createAction('[Auth] Register Success');
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: { code: string; message: string } }>());

export const logout = createAction('[Auth] Logout');