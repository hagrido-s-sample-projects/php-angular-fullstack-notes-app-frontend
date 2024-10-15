import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.apiUrl || 'http://localhost:8000';

  login(username: string, password: string): Observable<any> {
    console.log(username, password);
    return of({});
  }

  async register(username: string, email: string, password: string): Promise<{status: string, message: string, accessToken: string | null, refreshToken: string | null}> {
    console.log(username, email, password);
    if (!username || !email || !password) {
      return {status: 'error', message: 'All fields are required', accessToken: null, refreshToken: null};
    }

    const response = await fetch(`${this.apiUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, email, password}),
    });

    return {status: 'success', message: 'Registration successful', accessToken: '1234567890', refreshToken: '1234567890'};
  }

  logout(): Observable<any> {
    console.log('logout');
    return of({});
  }
}
