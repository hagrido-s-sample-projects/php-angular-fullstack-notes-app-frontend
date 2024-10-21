import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.email, this.password).subscribe(
      res => {
        if (res.status === 'SUCCESS') {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = res.error || 'Something went wrong';
        }
      }
    );
  }
}
