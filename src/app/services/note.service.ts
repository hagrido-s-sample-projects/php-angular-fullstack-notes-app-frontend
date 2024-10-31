import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  createNote(title: string): Observable<{status: string, note?: any, error?: string}> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<any>(`${this.apiUrl}/api/note`, { title }, { headers })
      .pipe(
        map(response => {
          if (response.status === 'SUCCESS') {
            return { status: 'SUCCESS', note: response.note };
          } else {
            return { status: 'ERROR', error: response.error };
          }
        }),
        catchError(error => {
          return of({ status: 'ERROR', error: error.error?.error || 'Internal server error, please try again later' });
        })
      );
  }

  getNotes(): Observable<{status: string, notes?: any[], error?: string}> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<any>(`${this.apiUrl}/api/notes`, { headers })
      .pipe(
        map(response => {
          return { status: 'SUCCESS', notes: response.notes };
        }),
        catchError(error => {
          return of({ status: 'ERROR', error: error.error?.error || 'Internal server error, please try again later' });
        })
      );
  }

  getNote(id: string): Observable<{status: string, note?: any, error?: string}> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<any>(`${this.apiUrl}/api/note/${id}`, { headers })
      .pipe(
        map(response => {
          return { status: 'SUCCESS', note: response.note };
        }),
      );
  }

  updateNote(id: string, title: string, content: string): Observable<{status: string, note?: any, error?: string}> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.put<any>(`${this.apiUrl}/api/note/${id}`, { title, content }, { headers })
      .pipe(
        map(response => {
          return { status: 'SUCCESS', note: response.note };
        }),
      );
  }
}
