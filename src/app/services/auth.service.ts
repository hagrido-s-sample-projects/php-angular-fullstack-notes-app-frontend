import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http.post<string>('/api/auth/login', { username, password });
  }

  register(username: string, email: string, password: string): Observable<void> {
    return this.http.post<void>('/api/auth/register', { username, email, password });
  }
}

