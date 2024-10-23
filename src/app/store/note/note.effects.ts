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
}
