import { User } from './user.model';

export enum NoteState {
  NORMAL = 'NORMAL',
  TRASHED = 'TRASHED',
  ARCHIVED = 'ARCHIVED'
}

export interface Note {
  id: number | null;
  title: string | null;
  content: string | null;
  owner: User;
  state: NoteState;
  createdAt: Date;
  updatedAt: Date;
}
