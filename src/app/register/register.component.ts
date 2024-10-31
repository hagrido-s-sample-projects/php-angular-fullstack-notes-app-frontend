import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth/auth.actions';
import { selectAuthError } from '../store/auth/auth.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  private errorSubscription: Subscription | null = null;
  private hasAttemptedRegister = false;

  constructor(private store: Store) {}

  ngOnInit() {
    this.errorSubscription = this.store.select(selectAuthError).subscribe(error => {
      if (error && this.hasAttemptedRegister) {
        this.errorMessage = error.message || 'Something went wrong';
      } else {
        this.errorMessage = null;
      }
    });
  }

  ngOnDestroy() {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }

  register() {
    this.hasAttemptedRegister = true;

    if (this.username && this.email && this.password) {
      this.errorMessage = null;
      this.store.dispatch(AuthActions.register({ 
        username: this.username, 
        email: this.email, 
        password: this.password 
      }));
    } else {
      this.errorMessage = 'All fields are required';
    }
  }
}
