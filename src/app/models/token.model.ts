import { Session } from './session.model';

export enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH'
}

export interface Token {
  id: number | null;
  token: string;
  type: TokenType;
  createdAt: Date;
  isRevoked: boolean;
}
