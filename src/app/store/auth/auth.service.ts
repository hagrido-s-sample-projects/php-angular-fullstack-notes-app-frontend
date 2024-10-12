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
      
    } catch (error) {
      
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