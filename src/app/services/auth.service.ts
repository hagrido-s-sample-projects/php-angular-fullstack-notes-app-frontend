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

  async register(username: string, email: string, password: string): Promise<any> {
    try {
      const response = await fetch(`http://localhost:8000/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  logout(): Observable<any> {
    console.log('logout');
    return of({});
  }
}
