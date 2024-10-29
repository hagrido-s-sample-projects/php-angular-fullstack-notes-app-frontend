import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as NoteActions from '../store/note/note.actions';
import { selectOpenedNote } from '../store/note/note.selectors';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  imports: [FormsModule]
})
export class NoteComponent implements OnInit {
  noteId: string | null = null;
  title: string = '';
  content: string = '';

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.noteId = params.get('id');
      if (this.noteId) {
        this.store.dispatch(NoteActions.getNote({ id: this.noteId }));
        this.store.select(selectOpenedNote).subscribe(note => {
          if (note) {
            console.log(note);
            this.title = note.title || '';
            this.content = note.content || '';
          }
        });
      }
    });
  }
}
