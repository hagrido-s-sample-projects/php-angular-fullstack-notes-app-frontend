import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { register } from '../store/auth.actions';
import { AuthState } from '../store/auth.state';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private store: Store<{ auth: AuthState }>) {}

  onRegister(username: string, email: string, password: string) {
    this.store.dispatch(register({ username, email, password }));
  }
}
