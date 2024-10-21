import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, { username, password });
  }

  register(username: string, email: string, password: string): Observable<{status: string, error?: string}> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/register`, { username, email, password }, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 201) {
            return { status: 'success' };
          } else {
            return { status: 'error', error: response.body?.error };
          }
        }),
        catchError(error => {
          return of({ status: 'error', error: error.error?.error || 'Internal server error, please try again later' });
        })
      )
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/logout`, {});
  }
}
