import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import * as AuthActions from '../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title = 'Login';

  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private store: Store) {}

  login() {
    if (this.username && this.password) {
      this.errorMessage = null;
      this.store.dispatch(AuthActions.login({ username: this.username, password: this.password }));
    } else {
      this.errorMessage = 'All fields are required';
    }
  }
}
