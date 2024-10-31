import { createAction, props } from "@ngrx/store";
import { Note } from "../../models/note.model";

export const getNotes = createAction('[Note] Get Notes');
export const getNotesSuccess = createAction('[Note] Get Notes Success', props<{ notes: Note[] }>());
export const getNotesFailure = createAction('[Note] Get Notes Failure', props<{ error: string }>());

export const createNote = createAction(
  '[Note] Create Note',
  props<{ title: string }>()
);
export const createNoteSuccess = createAction('[Note] Create Note Success', props<{ note: any }>());
export const createNoteFailure = createAction('[Note] Create Note Failure');

export const getNote = createAction('[Note] Get Note', props<{ id: string }>());
export const getNoteSuccess = createAction('[Note] Get Note Success', props<{ note: Note }>());
export const getNoteFailure = createAction('[Note] Get Note Failure', props<{ error: string }>());

export const clearOpenedNote = createAction('[Note] Clear Opened Note');

export const updateNote = createAction('[Note] Update Note', props<{ id: string, title: string, content: string }>());
export const updateNoteSuccess = createAction('[Note] Update Note Success', props<{ note: Note }>());
export const updateNoteFailure = createAction('[Note] Update Note Failure', props<{ error: string }>());

export const deleteNote = createAction('[Note] Delete Note', props<{ id: string }>());
export const deleteNoteSuccess = createAction('[Note] Delete Note Success', props<{ id: string }>());
export const deleteNoteFailure = createAction('[Note] Delete Note Failure', props<{ error: string }>());
