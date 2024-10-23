import { Note } from './note.model';

export interface User {
  id: number | null;
  email: string;
  username: string;
  createdAt: Date;
  sessions?: number[]; // Array of session IDs
  notes?: number[]; // Array of note IDs
}
