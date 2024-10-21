import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isMenuOpen = false;
}
