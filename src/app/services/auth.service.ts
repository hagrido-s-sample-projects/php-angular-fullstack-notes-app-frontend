import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://your-api-url'; // Replace with your actual API URL

  login(username: string, password: string): Observable<any> {
    console.log(username, password);
    return of({});
  }

  register(username: string, email: string, password: string): Observable<any> {
    console.log(username, email, password);
    return of({});
  }

  logout(): Observable<any> {
    console.log('logout');
    return of({});
  }
}
