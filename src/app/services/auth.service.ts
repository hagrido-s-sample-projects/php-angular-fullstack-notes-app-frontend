import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
            localStorage.setItem('access_token', response.body.access_token);
            localStorage.setItem('refresh_token', response.body.refresh_token);
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
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<any>(`${this.apiUrl}/api/auth/logout`, {}, { headers })
      .pipe(
        map(response => {
          if (response.status === 200 && response.body?.status === 'SUCCESS') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return { status: 'SUCCESS' };
          } else {
            return { status: 'ERROR', error: response.body?.error || 'Internal server error, please try again later' };
          }
        }),
        catchError(error => {
          return of({ status: 'ERROR', error: error.error?.error || 'Internal server error, please try again later' });
        })
      );
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  getTokens(): { accessToken: string | null, refreshToken: string | null } {
    return {
      accessToken: localStorage.getItem('access_token'),
      refreshToken: localStorage.getItem('refresh_token')
    };
  }

  validateToken(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    return this.http.post<any>(`${this.apiUrl}/api/auth/validate`, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`
      })
    });
  }
}
