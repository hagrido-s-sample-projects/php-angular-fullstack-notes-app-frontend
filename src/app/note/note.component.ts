import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as NoteActions from '../store/note/note.actions';
import { selectOpenedNote } from '../store/note/note.selectors';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  imports: [FormsModule, NgIf, NgClass]
})
export class NoteComponent implements OnInit, OnDestroy {
  noteId: string | null = null;
  title: string = '';
  content: string = '';
  isLoading: boolean = false;
  isLoadingSuccess: boolean = false;
  showStats: boolean = false;
  isMenuOpen: boolean = false;
  originalTitle: string = '';
  originalContent: string = '';

  Math = Math;

  private subscriptions: Subscription[] = [];

  @ViewChild('contentTextarea') contentTextarea!: ElementRef<HTMLTextAreaElement>;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {}

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler() {
    this.updateNote();
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isMenuOpen && !(event.target as HTMLElement).closest('.menu__wrapper')) {
      this.isMenuOpen = false;
    }
  }

  ngOnInit(): void {
    const paramsSub = this.route.paramMap.subscribe(params => {
      this.noteId = params.get('id');
      if (this.noteId) {
        this.store.dispatch(NoteActions.getNote({ id: this.noteId }));
        const noteSub = this.store.select(selectOpenedNote).subscribe(note => {
          if (note) {
            this.title = note.title || '';
            this.content = note.content || '';
            this.originalTitle = note.title || '';
            this.originalContent = note.content || '';
          }
        });
        this.subscriptions.push(noteSub);
      }
    });
    this.subscriptions.push(paramsSub);
  }

  ngOnDestroy(): void {
    if (this.title !== this.originalTitle || this.content !== this.originalContent) {
      this.updateNote();
    }
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.store.dispatch(NoteActions.clearOpenedNote());
  }

  ngAfterViewInit(): void {
    this.adjustTextareaHeight();
  }

  onContentInput(): void {
    this.adjustTextareaHeight();
  }

  private adjustTextareaHeight(): void {
    const textarea = this.contentTextarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  updateNote(): void {
    if (this.noteId && !this.isLoading) {
      this.isLoading = true;
      this.store.dispatch(NoteActions.updateNote({ id: this.noteId, title: this.title, content: this.content }));
      const updateSub = this.store.select(selectOpenedNote).subscribe(note => {
        if (note) {
          this.title = note.title || '';
          this.content = note.content || '';
          this.showSuccess()
        }
      });
      this.subscriptions.push(updateSub);
    }
  }

  showSuccess(): Promise<void> {
    this.isLoadingSuccess = true;
    return new Promise(resolve => {
      setTimeout(() => {
        this.isLoadingSuccess = false;
        this.isLoading = false;
        resolve();
      }, 3000);
    });
  }

  closeStats(): void {
    this.showStats = false;
  }

  openStats(): void {
    this.showStats = true;
    this.isMenuOpen = false;
  }
  
  countParagraphs(): number {
    return this.content.split('\n').filter(line => line.trim().length > 0).length;
  }

  exit(): void {
    this.updateNote();
    this.router.navigate(['/dashboard']);
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  archiveNote(): void {
    // TODO: Implement archive functionality
    this.router.navigate(['/dashboard']);
  }

  deleteNote(): void {
    // TODO: Implement delete functionality
    this.router.navigate(['/dashboard']);
  }
}
