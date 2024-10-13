import { User } from "./user.model";

export interface Session {
  id: number;
  user: User;
  accessToken: string;
  refreshToken: string;
  isRevoked: boolean;
  createdAt: Date;
}
