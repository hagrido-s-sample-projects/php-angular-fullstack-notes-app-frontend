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
