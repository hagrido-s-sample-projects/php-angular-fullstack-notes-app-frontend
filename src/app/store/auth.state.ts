export interface AuthState {
  token: string | null;
  authState: boolean | null;
}

export const initialAuthState: AuthState = {
  token: null,
  authState: null,
};
