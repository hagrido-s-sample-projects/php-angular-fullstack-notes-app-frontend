import { createReducer, on } from '@ngrx/store';
import * as NoteActions from './note.actions';
import { Note } from '../../models/note.model';

export interface NoteState {
  notes: Note[];
}

export const initialNoteState: NoteState = {
  notes: [],
};

export const noteReducer = createReducer(
  initialNoteState,
  on(NoteActions.createNoteSuccess, (state, { note }) => ({ ...state, notes: [...state.notes, note] }))
);
