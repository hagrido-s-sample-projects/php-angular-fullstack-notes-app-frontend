import { createAction, props } from "@ngrx/store";

export const login = createAction('[Auth] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ accessToken: string, refreshToken: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: { status: string; message: string } }>());

export const register = createAction('[Auth] Register', props<{ username: string; email: string; password: string }>());
export const registerSuccess = createAction('[Auth] Register Success');
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: { status: string; message: string } }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: { status: string; message: string } }>());

export const initializeAuth = createAction('[Auth] Initialize Auth');
export const setTokens = createAction('[Auth] Set Tokens', props<{ accessToken: string, refreshToken: string }>());