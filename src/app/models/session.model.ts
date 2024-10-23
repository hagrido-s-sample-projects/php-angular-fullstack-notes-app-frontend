import { User } from './user.model';
import { Token } from './token.model';

export interface Session {
  id: number | null;
  userId: number; // Reference to the user, not the full user object
  tokens: Token[];
  isRevoked: boolean;
  createdAt: Date;
}
