import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.username, this.email, this.password).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // Handle successful registration (e.g., navigate to login page)
      },
      (error) => {
        console.error('Registration failed', error);
        // Handle registration error (e.g., display error message)
      }
    );
  }
}
