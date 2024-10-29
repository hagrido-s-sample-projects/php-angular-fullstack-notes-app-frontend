import { createReducer, on } from '@ngrx/store';
import * as NoteActions from './note.actions';
import { Note } from '../../models/note.model';

export interface NoteState {
  notes: Note[];
  error: string | null;
}

export const initialNoteState: NoteState = {
  notes: [],
  error: null,
};

export const noteReducer = createReducer(
  initialNoteState,
  on(NoteActions.getNotes, state => state),
  on(NoteActions.createNoteSuccess, (state, { note }) => ({ ...state, notes: [...state.notes, note] })),
  on(NoteActions.getNotesSuccess, (state, { notes }) => ({
    ...state,
    notes: notes,
    error: null
  })),
  on(NoteActions.getNotesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
