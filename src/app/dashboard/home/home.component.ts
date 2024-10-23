import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isCreateDialogOpen = false;

  showCreateNoteDialog() {
    this.isCreateDialogOpen = true;
  }
}
