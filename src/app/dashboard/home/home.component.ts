import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as NoteActions from '../../store/note/note.actions';
import { selectAllNotes } from '../../store/note/note.selector';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private store = inject(Store);
  
  isCreateDialogOpen = false;
  noteTitle: string = '';
  errorMessage: string | null = null;
  notes$ = this.store.select(selectAllNotes);

  showCreateNoteDialog() {
    this.isCreateDialogOpen = true;
  }

  closeCreateDialog() {
    this.isCreateDialogOpen = false;
    this.noteTitle = '';
    this.errorMessage = null;
  }

  createNote() {
    this.store.dispatch(NoteActions.createNote({ title: this.noteTitle.trim() }));
    this.closeCreateDialog();
  }
}
