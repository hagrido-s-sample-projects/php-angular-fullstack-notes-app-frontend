import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isCreateDialogOpen = false;
  noteTitle: string = '';
  errorMessage: string | null = null;

  showCreateNoteDialog() {
    this.isCreateDialogOpen = true;
  }

  closeCreateDialog() {
    this.isCreateDialogOpen = false;
  }

  createNote() {
    // Implement note creation logic here
  }
}
