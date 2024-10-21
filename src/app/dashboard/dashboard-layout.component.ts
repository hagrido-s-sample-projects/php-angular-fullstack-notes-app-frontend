import { Component, ElementRef, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [NgClass, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  isMenuOpen = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // Add methods for each menu option
  onProfileClick() {
    console.log('Profile clicked');
    this.closeMenu();
  }

  onArchiveClick() {
    console.log('Archive clicked');
    this.closeMenu();
  }

  onTrashClick() {
    console.log('Trash clicked');
    this.closeMenu();
  }

  onSettingsClick() {
    console.log('Settings clicked');
    this.closeMenu();
  }

  onLogoutClick() {
    console.log('Logout clicked');
    this.closeMenu();
  }
}