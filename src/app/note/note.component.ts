import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as NoteActions from '../store/note/note.actions';
import { selectOpenedNote } from '../store/note/note.selectors';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  imports: [FormsModule]
})
export class NoteComponent implements OnInit, OnDestroy {
  noteId: string | null = null;
  title: string = '';
  content: string = '';
  isLoading: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const paramsSub = this.route.paramMap.subscribe(params => {
      this.noteId = params.get('id');
      if (this.noteId) {
        this.isLoading = true;
        this.store.dispatch(NoteActions.getNote({ id: this.noteId }));
        const noteSub = this.store.select(selectOpenedNote).subscribe(note => {
          if (note) {
            console.log(note);
            this.title = note.title || '';
            this.content = note.content || '';
          }
          this.isLoading = false;
        });
        this.subscriptions.push(noteSub);
      }
    });
    this.subscriptions.push(paramsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.store.dispatch(NoteActions.clearOpenedNote());
  }

  updateNote(): void {
    if (this.noteId) {
      this.isLoading = true;
      this.store.dispatch(NoteActions.updateNote({ id: this.noteId, title: this.title, content: this.content }));
      const updateSub = this.store.select(selectOpenedNote).subscribe(note => {
        if (note) {
          this.title = note.title || '';
          this.content = note.content || '';
        }
        this.isLoading = false;
      });
      this.subscriptions.push(updateSub);
    }
  }
}
