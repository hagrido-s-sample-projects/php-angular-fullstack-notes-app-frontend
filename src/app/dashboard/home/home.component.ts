import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as NoteActions from '../../store/note/note.actions';
import { Observable } from 'rxjs';
import * as NoteSelectors from '../../store/note/note.selectors';
import { Note } from '../../models/note.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  notes$: Observable<Note[]>;

  isCreateDialogOpen = false;
  noteTitle: string = '';
  errorMessage: string | null = null;

  constructor(private store: Store, private router: Router) {
    this.notes$ = this.store.select(NoteSelectors.selectAllNotes);
  }

  openNote(id: string) {
    if (id) {
      this.router.navigate(['/note', id]);
    }
  }

  ngOnInit() {
    this.loadNotes();
    this.notes$.subscribe(notes => console.log('Notes from store:', notes));
  }

  loadNotes() {
    this.store.dispatch(NoteActions.getNotes());
  }

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
