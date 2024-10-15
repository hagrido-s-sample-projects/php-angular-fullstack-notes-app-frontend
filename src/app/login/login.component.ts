import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title = 'Login';

  constructor(private store: Store) {}

  onLogin(username: string, password: string) {
    console.log(username, password);
  }
}
