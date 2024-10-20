import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

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
        if (error.status === 409) {
          console.error('Email already exists');
          // Display appropriate message to the user
        } else {
          console.error('Registration failed', error);
          // Handle other types of errors
        }
      }
    );
  }
}
