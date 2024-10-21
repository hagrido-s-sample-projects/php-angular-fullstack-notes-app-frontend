import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{status: string, error?: string, access_token?: string, refresh_token?: string}> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/login`, { username, password }, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200 && response.body?.status === 'SUCCESS') {
            return { 
              status: 'SUCCESS', 
              access_token: response.body.access_token,
              refresh_token: response.body.refresh_token
            };
          } else if (response.status === 401 && response.body?.status === 'INVALID_CREDENTIALS') {
            return { status: 'INVALID_CREDENTIALS', error: response.body?.error };
          } else {
            return { status: 'ERROR', error: response.body?.error };
          }
        }),
        catchError(error => {
          return of({ status: 'ERROR', error: error.error?.error || 'Internal server error, please try again later' });
        })
      )
  }

  register(username: string, email: string, password: string): Observable<{status: string, error?: string}> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/register`, { username, email, password }, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 201) {
            return { status: 'SUCCESS' };
          } else {
            return { status: 'ERROR', error: response.body?.error };
          }
        }),
        catchError(error => {
          return of({ status: 'ERROR', error: error.error?.error || 'Internal server error, please try again later' });
        })
      )
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/logout`, {});
  }
}
