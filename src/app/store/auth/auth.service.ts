import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockToken = 'mock-token';

  constructor() {}

  login(username: string, password: string): Observable<string> {
    try {
      const backendUrl = process.env['BACKEND_URL'];
      if (!backendUrl) {
        throw new Error('BACKEND_URL is not defined in the environment variables');
      }

      return of(this.mockToken).pipe(
        delay(1000) // Simulate network delay
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  register(username: string, password: string): Observable<string> {
    // Simulate an API call with a delay
    return of({ username, password }).pipe(
      delay(1000), // Simulate network delay
      map(() => this.mockToken) // Return a mock token
    );
  }
}