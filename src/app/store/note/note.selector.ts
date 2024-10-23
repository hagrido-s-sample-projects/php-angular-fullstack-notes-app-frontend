import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NoteState } from './note.reducer';
import { Note } from '../../models/note.model';

export const selectNoteState = createFeatureSelector<NoteState>('note');

export const selectAllNotes = createSelector(
  selectNoteState,
  (state: NoteState) => state.notes
);

export const selectNoteById = (noteId: number) => createSelector(
  selectAllNotes,
  (notes: Note[]) => notes.find(note => note.id === noteId)
);

export const selectNotesByState = (noteState: string) => createSelector(
  selectAllNotes,
  (notes: Note[]) => notes.filter(note => note.state === noteState)
);

export const selectTotalNotes = createSelector(
  selectAllNotes,
  (notes: Note[]) => notes.length
);
