import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { NoteService } from '../../services/note.service';
import * as NoteActions from './note.actions';
import { of } from 'rxjs';

@Injectable()
export class NoteEffects {
  private actions$ = inject(Actions);
  private noteService = inject(NoteService);

  createNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.createNote),
      switchMap(({ title }) => {
        console.log('Creating note in effect:', { title });
        return this.noteService.createNote(title).pipe(
          map((note) => {
            console.log('Note created successfully:', note);
            return NoteActions.createNoteSuccess({ note });
          }),
          catchError((error) => {
            console.error('Error creating note:', error);
            return of(NoteActions.createNoteFailure());
          })
        );
      })
    )
  );

  getNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.getNotes),
      switchMap(() => this.noteService.getNotes().pipe(
        map(response => {
          if (response.status === 'SUCCESS' && response.notes) {
            return NoteActions.getNotesSuccess({ notes: response.notes });
          } else {
            return NoteActions.getNotesFailure({ error: response.error || 'Unknown error occurred' });
          }
        }),
        catchError(error => of(NoteActions.getNotesFailure({ error: error.message })))
      ))
    )
  );

  getNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.getNote),
      switchMap(({ id }) => this.noteService.getNote(id).pipe(map(response => NoteActions.getNoteSuccess({ note: response.note }))))
    )
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.updateNote),
      switchMap(({ id, title, content }) => this.noteService.updateNote(id, title, content).pipe(map(response => NoteActions.updateNoteSuccess({ note: response.note }))))
    )
  );
}
